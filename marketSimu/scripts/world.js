class World {
	constructor() {

		this.companies = []
		this.mainProducts = []
		this.allProducts = []

		this.process

	}
	getCompany(name) {
		return this.companies.find(c => c.name == name)
	}
	getProduct(name) {
		return this.allProducts.find(c => c.name == name)
	}
	createProducts(options) {

		let amounts = options.amounts

		// create raw products
		let rawProducts = []
		for(let i=0;i<amounts.raw.raw;i++) {
			rawProducts.push(new Product({productionType: 'r'}))
		}

		// create base products
		let baseProducts = []
		for(let i=0;i<amounts.base.base;i++) {
			let randomRecipe = []
			let randomRecipeAmount = utils.randomInt(amounts.base.raw[0], amounts.base.raw[1])
			for(let j=0;j<randomRecipeAmount;j++) randomRecipe.push(rawProducts[Math.floor(Math.random()*rawProducts.length)])

			let product = new Product({
				recipe: randomRecipe,
				productionType: 'b'
			})

			baseProducts.push(product)
		}

		// create sub products
		let subProducts = []
		for(let i=0;i<amounts.sub.sub;i++) {
			let randomRecipe = []
			let randomRecipeAmount = utils.randomInt(amounts.sub.base[0], amounts.sub.base[1])
			for(let j=0;j<randomRecipeAmount;j++) randomRecipe.push(baseProducts[Math.floor(Math.random()*baseProducts.length)])

			let product = new Product({
				recipe: randomRecipe,
				productionType: 's'
			})

			subProducts.push(product)
		}

		// create main products
		let mainProducts = []
		for(let i=0;i<amounts.main.main;i++) {
			let randomRecipe = []
			let randomRecipeAmount = utils.randomInt(amounts.main.sub[0], amounts.main.sub[1])
			for(let j=0;j<randomRecipeAmount;j++) randomRecipe.push(subProducts[Math.floor(Math.random()*subProducts.length)])

			let product = new Product({
				recipe: randomRecipe,
				productionType: 'm'
			})

			mainProducts.push(product)
		}

		this.allProducts = [...mainProducts, ...subProducts, ...baseProducts, ...rawProducts] 
		this.mainProducts = mainProducts
	}
	startProcess() {
		this.process = new Process()
		this.process.run()
	}
	createCompanies(amount) {
		for(let i=0;i<amount;i++) {

			let company = new Company({ balance: 100000 })
			this.companies.push(company)

		}

		let allProductsWithoutRaw = this.allProducts.filter(p => p.productionType != 'r')

		for(let i=0;i<amount;i++) {
			let company = this.companies[i]
			for(let j=0;j<10;j++) {
				let randomProduct = allProductsWithoutRaw[Math.floor(Math.random()*allProductsWithoutRaw.length)]
				company.addProduction(randomProduct.name)
			}

		}
	}
	createRandomCompany() {
		let allProductsWithoutRaw = this.allProducts.filter(p => p.productionType != 'r')
		
		let companyOptions = {
			balance: 10000
		}

		let company = new Company(companyOptions)
		this.companies.push(company)

		for(let j=0;j<10;j++) {

			let randomProduct = allProductsWithoutRaw[Math.floor(Math.random()*allProductsWithoutRaw.length)]
			company.addProduction(randomProduct.name)

		}
	}
	createCompany(options) {
		let company = new Company(options)

		this.companies.push(company)
	}
}