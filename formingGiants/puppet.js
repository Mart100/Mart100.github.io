class Puppet {
	constructor(options) {
		if(!options) options = {}

		this.genes = []
		this.genes = options.genes || this.generateGenesByOffspring(options.parents) || this.generateGenesRandom()
		this.age = 0
		this.size = 5
		this.socialstatus = 0
		this.pos = options.pos || new Vector(Math.random()*window.innerWidth, Math.random()*window.innerHeight)
		this.color = options.color || (Math.random() > 0.5 ? options.parents[0].color : options.parents[1].color)
	}
	generateGenesByOffspring(parents) {
		
		if(!parents) return false

		let geneList = world.geneList

		for(let gene of geneList) {
			this.genes[gene.name] = (parents[0].genes[gene.name] + parents[1].genes[gene.name])/2
			if(Math.random() > 0.9) this.genes[gene.name] = Math.random()
		}

		return this.genes
	}
	generateGenesRandom() {
		for(let gene of world.geneList) this.genes[gene.name] = Math.random()
		return this.genes
	}
}