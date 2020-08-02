class Building {
	constructor() {
		this.width = 50
		this.height = 200
		this.pos = {
			x: 0,
			y: 0,
			z: 0
		}
	}
	randomize() {
		this.width = gaussianRange(50, 100, 2)

		let height = 0
		while(height < 100 || height > maxBuildingHeight) height = randn_bm(50-700, maxBuildingHeight+300, 1)
		this.height = Math.round(height)

		this.pos.x = Math.random()*canvas.width
		this.pos.y = buildingsY
		this.pos.z = Math.random()*1000
	}
}