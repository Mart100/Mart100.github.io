class Process {
	constructor() {
		this.speed = 1000/100
	}
	run() {
		if(this.interval) this.stop()
		this.interval = setInterval(() => {
			this.tick()
		}, this.speed)
	}
	stop() {
		clearInterval(this.interval)
		this.interval = null
	}
	tick() {
		for(let puppet of world.puppets) puppetTick(puppet)
	}
	puppetTick(puppet) {

		// calculate best position
		let heatmapSkip = 50
		let heatmap = new Array(world.size.x*world.size.y)
		
		for(let x=0;x<world.size.x;x+=heatmapSkip) {
			for(let y=0;y<world.size.y;y+=heatmapSkip) {
				let idx = (y*world.size.x)/heatmapSkip + x/heatmapSkip
				heatmap

			}
		}
	}
}