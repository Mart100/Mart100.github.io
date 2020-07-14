class Product {
	constructor(options) {
		this.name = options.name || this.randomName()
		this.recipe = options.recipe || null
		this.price = options.price || 1
		this.productionType = options.productionType || ''
		this.type = options.type || Math.random()
		this.sales = 0
		this.amount = options.amount || 0
		this.supplier = options.supplier || null
	}
	randomName() {
		let vowels = 'aeiouy'
		let nonvowels = 'bcdfghjklmnpqrstvwxz'

		let randomVowel = () => vowels[Math.floor(Math.random()*vowels.length)]
		let randomNonvowel = () => nonvowels[Math.floor(Math.random()*nonvowels.length)]
		let name = randomNonvowel() + randomVowel() + randomNonvowel() + randomVowel() + randomNonvowel()
		return name
	}
}