class Company {
	constructor(options) {
		this.name = this.randomName()
		this.products = []
		this.inventory = {}
		this.balance = options.balance || 0
		this.earnings = 0
		this.employees = 1
		this.productAmountCap = 10000
		this.age = 0
		this.recaps = []
		this.demand = {}

		//if(options.products) for(let product of options.products) this.addProduction(product)
	}
	getLastRecap() {
		if(this.recaps.length == 0) this.recap()
		let lastRecap = this.recaps[this.recaps.length-1]
		return lastRecap
	}
	recap() {
		let lastRecap = this.recaps[this.recaps.length-1]
		if(!lastRecap) {
			lastRecap = {
				earnings: 0,
				balance: this.balance,
				employees: this.employees
			}
		}
		
		let newRecap = {
			earnings: this.earnings-lastRecap.earnings,
			balanceChanges: this.balance-lastRecap.balance,
			balance: this.balance,
			employees: this.employees,
			employeeChanges: this.employees-lastRecap.employees,
			age: this.age
		}

		this.recaps.push(newRecap)
	}
	constructProduct(productName) {

		let product = world.allProducts.find(p => p.name == productName)
		let suppliers = this.findProduct(productName).suppliers


		if(product.productionType == 'r') return 'RAW'

		let finalProductInInventory = this.inventory[product.name]
		if(finalProductInInventory && finalProductInInventory.amount > this.productAmountCap-1) return 'LIMIT'
		
		// check if has all components, otherwise buy
		for(let component of product.recipe) {

			let componentInInventory = this.inventory[component.name]

			let supplier = suppliers[component.name]
			//if(Math.random() > 0.9999) console.log(this.products, suppliers, supplier)

			if(!supplier) supplier = this.searchSuppliers(component.name)
			if(!componentInInventory) {
				this.inventory[component.name] = { amount: 0 }
				componentInInventory = this.inventory[component.name]
			}


			if(componentInInventory.amount < 1) {
				let res = this.buyProduct(component, supplier)
				if(res != 'OK') {
					if(res == 'SEARCH_SUPPLIER') suppliers[component.name] = this.searchSuppliers(component.name)

					return 'ERR_BUY'
				}
			}
		}

		for(let component of product.recipe) {
			let componentInInventory = this.inventory[component.name]
			componentInInventory.amount--
		}

		if(this.inventory[product.name]) this.inventory[product.name].amount++
		else this.inventory[product.name] = { amount: 0 }

		return 'OK'

	}
	bankrupt() {
		world.companies.splice(world.companies.indexOf(this), 1)
	}
	findProduct(productName) {
		return this.products.find(p => p.name == productName)
	}
	buyProduct(product, supplierName) {

		let productName = product.name
		let productionType = product.productionType

		let supplier = world.getCompany(supplierName)
		if(!supplier) return 'SEARCH_SUPPLIER'


		if(productionType == 'r') {
			this.balance--
			let productInInventory = this.inventory[product.name]
			if(productInInventory) productInInventory.amount++
			else this.inventory[product.name] = { amount: 0 }
			return 'RAW'
		}
		
		let supplierProduct = supplier.findProduct(product.name)
		
		//if(!supplierProduct) return

		let price = supplierProduct.price

		//if(Math.random() > 0.999) console.log(supplier)
		let response = supplier.sellProduct(supplierProduct, price)

		if(this.demand[productName] == undefined) this.demand[productName] = 0

		if(response != 'OK') {
			if(response == 'NOT_ENOUGH') this.demand[productName] += 1
			return 'SELL_'+response
		}

		if(this.demand[productName] > 0) this.demand[productName] -= 5

		this.balance -= price

		let productInInventory = this.inventory[productName]
		if(productInInventory) productInInventory.amount++
		else {
			this.inventory[product.name] = { amount: 0 }
		}

		return 'OK'
	}
	sellProduct(product, price) {
		let productInInventory = this.inventory[product.name]
		//if(Math.random() > 0.999) console.log(product, price, productInInventory)
		
		if(!productInInventory) return 'UNDEFINED'
		if(productInInventory.amount < 1) return 'NOT_ENOUGH'

		productInInventory.amount--
		this.balance += price
		this.earnings += price

		let productInProducts = this.products.find(p => p.name == product.name)
		productInProducts.sales += 1

		return 'OK'
	}
	addProduction(productName) {

		let product = world.allProducts.find(p => p.name == productName)

		if(!product) return

		let price = 0
		let suppliers = {}

		if(product.recipe) {
			for(let component of product.recipe) {
				if(component.type == 'r') {
					price += 1
					continue
				}
				component.typePreference = Math.random()
				suppliers[component.name] = this.searchSuppliers(component.name)

				if(!suppliers[component.name]) {
					this.addProduction(component)
					suppliers[component.name] = this.name
				}
				//console.log(suppliers, component, suppliers[component.name])
				let supplier = world.companies.find(c => c.name == suppliers[component.name])
				//console.log(supplier)
				price += supplier.products.find(p => p.name == component.name).price
			}

		} else {
			price = 1
		}


		// add profit margin
		price *= 2
		price = Math.floor(price*1000)/1000

		this.employees += 1

		this.inventory[product.name] = {amount: 0}

		this.products.push({
			name: product.name, 
			price: price,
			suppliers: suppliers,
			sales: 0,
			type: Math.random()
		})
	}

	randomName() {
		let vowels = 'aeiouy'
		let nonvowels = 'bcdfghjklmnpqrstvwxz'

		let RV = () => vowels[Math.floor(Math.random()*vowels.length)]
		let RNV = () => nonvowels[Math.floor(Math.random()*nonvowels.length)]
		let name = RNV().toUpperCase() + RV() + RNV() + RV() + RNV() + RV() + RNV() + ' Inc.'
		return name
	}
	searchSuppliers(productName) {

		let typePreference = Math.random()

		let possibleSuppliers = []
		for(let company of world.companies) {
			let companyProduct = company.products.find(p => p.name == productName)
			if(companyProduct) {
				possibleSuppliers.push({
					company: company,
					price: companyProduct.price,
					type: companyProduct.type
				})
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

			let inventoryProduct = supp.company.inventory[productName]
			if(!inventoryProduct || inventoryProduct.amount < 5) score -= 1000
			else {
				score += (inventoryProduct.amount/this.productAmountCap)
			}

			return score
		}

		let possibleSuppliersSorted = possibleSuppliers.sort((a, b) => scoreSupplier(a) - scoreSupplier(b))

		let bestSupplier
		if(possibleSuppliersSorted.length > 0) bestSupplier = possibleSuppliersSorted[0]

		if(bestSupplier) bestSupplier = bestSupplier.company.name
		
		//if(Math.random()>0.9999) console.log('sksksks', bestSupplier, productName)
		if(!bestSupplier) {
			this.addProduction(productName)
			return this.name
		}
		return bestSupplier
	}
}