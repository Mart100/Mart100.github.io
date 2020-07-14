class Process {
	constructor() {
		this.speed = 1000/100
		this.tickCount = 0
	}
	run() {
		if(this.interval) this.stop()
		this.interval = setInterval(() => {
			this.tickCount++

			if(this.tickCount % (1000/this.speed) == 0) this.secondTick()

			if(this.tickCount % (100/this.speed) == 0) this.slowerTick()

			if(this.tickCount % (500/this.speed) == 0) {
				if(dashboard.currentWindow == 'companies' && dashboard.currentCompany != null) dashboard.focusCompany(dashboard.currentCompany)
				if(dashboard.currentWindow == 'companies') dashboard.refreshCompaniesList()
			}

			this.tick()
		}, this.speed)
	}
	stop() {
		clearInterval(this.interval)
		this.interval = null
	}
	slowerTick() {

	}
	secondTick() {
		if(world.companies.length < 200) world.createRandomCompany()

		for(let company of world.companies) {
			company.recap()
		}


	}
	tick() {
		for(let company of world.companies) this.companyTick(company)

		// clients buying final products
		let finalProducts = []
		for(let company of world.companies) finalProducts.concat(company.products.filter(p => p.productionType == 'm'))
		for(let i=0;i<1;i++) {
			let productWanted = world.mainProducts[Math.floor(Math.random()*world.mainProducts.length)]
			let typePreference = Math.random()

			let possibleSuppliers = []
			for(let company of world.companies) {
				let companyProduct = company.products.find(p => p.name == productWanted.name)
				if(companyProduct) {
					let companyProductInventory = company.inventory[productWanted.name]
					if(companyProductInventory && companyProductInventory.amount > 0) {
						possibleSuppliers.push({
							company: company,
							price: companyProduct.price,
							type: companyProduct.type,
							productInv: companyProductInventory,
							product: companyProduct
						})
					}
				}
			}
	
			let averageSupplierPrice = 0
			if(possibleSuppliers.length > 0) averageSupplierPrice = possibleSuppliers.reduce((acc, currentVal) => acc+currentVal.price) / possibleSuppliers.length
	
			let scoreSupplier = (supp) => {
				let score = 0
				let priceDiff = averageSupplierPrice-supp.price
				score += priceDiff
	
				let typeDiff = Math.abs(typePreference-supp.type)
				score -= (1-typeDiff)*averageSupplierPrice
	
				let inventoryProduct = supp.company.inventory[productWanted.name]
				if(!inventoryProduct || inventoryProduct.amount < 5) score -= 1000
				else {
					score += inventoryProduct.amount
				}
	
				return score
			}

			let possibleSuppliersSorted = possibleSuppliers.sort((a, b) => scoreSupplier(a) - scoreSupplier(b))

			let bestSupplier
			if(possibleSuppliersSorted.length > 0) bestSupplier = possibleSuppliersSorted[0]
			
			if(bestSupplier) bestSupplier.company.sellProduct(bestSupplier['product'], bestSupplier['price'])


		}
	}
	companyTick(company) {
		for(let i=0;i<company.employees;i++) {
			let randomProduct = company.products[Math.floor(Math.random()*company.products.length)]
			let res = company.constructProduct(randomProduct.name)
			//if(res != 'OK') i--
		}

		company.balance -= (company.employees/10)

		company.balance -= (Math.pow(company.products.length, 2)/100)

		company.age += 1

		if(company.balance < 0) company.bankrupt()

		if(Math.random() > 0.99) {
			for(let product of company.products) company.searchSuppliers(product)
		}
	}
}