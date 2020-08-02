class World {
	constructor() {
		this.isPaused = false
		this.tickSpeed = settings.speed
		this.tickCount = 0
		this.deltaTick = 0
		this.lastTick = 0
		this.entities = []
		this.particles = []
		this.camera = new Camera()
		this.grid = new Grid()

		setInterval(() => { 
			this.tick() 
		}, 10)

	}
	load() {
		
		this.player = new Player()
		
	}
	tick() {
		if(this.isPaused) return

		let now = Date.now()

		this.deltaTick = now-this.lastTick
		infoPanel.add('deltaTick', this.deltaTick)

		this.tickCount++

		tick()

		this.lastTick = now
	}
}