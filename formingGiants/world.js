class World {
	constructor() {

		this.population = 1000
		this.geneAmount = 10
		this.size = new Vector(window.innerWidth, window.innerHeight)

		this.geneList = []
		this.puppets = []

		this.process
		this.renderer

	}
	startProcess() {
		this.process = new Process()
		this.process.run()
	}
	startRenderer() {
		this.renderer = new Renderer()
		this.renderer.unpause()
	}
	createGenes(amount) {
		let vowels = 'aeiouy'
		let nonvowels = 'bcdfghjklmnpqrstvwxz'

		let randomVowel = () => vowels[Math.floor(Math.random()*vowels.length)]
		let randomNonvowel = () => nonvowels[Math.floor(Math.random()*nonvowels.length)]

		for(let i=0;i<amount;i++) {
			let gene = {}
			gene.weight = Math.random()
			gene.name = randomNonvowel() + randomVowel() + randomNonvowel() + randomVowel() + randomNonvowel()
			this.geneList.push(gene)
		}
	}
	clearPuppets() {
		this.puppets = []
	}
	createPuppets(amount) {
		for(let i=0;i<amount;i++) {
			let puppetOptions = {
				color: randomRGB()
			}
			let newPuppet = new Puppet(puppetOptions)

			this.puppets.push(newPuppet)
		}
	}
}