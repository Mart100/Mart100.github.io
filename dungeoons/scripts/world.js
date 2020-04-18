class World {
	constructor() {
		this.isPaused = false
		this.tickSpeed = settings.speed
		this.tickCount = 0
		this.lastTick = 0
		this.deltaTick = 0
		this.entities = []
		this.particles = []
		this.enemies = []
		this.droppedItems = []
		this.animationTickTwo = 0
		this.animations = {
			katanaswing: 0
		}
		this.grid = new Grid(this)
		this.rendering = new RenderEngine(this)
		this.player = new Player()
		this.seed = Math.round(Math.random()*65536)

		setInterval(() => { 
			this.tick() 
		}, 1000/this.tickSpeed)

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