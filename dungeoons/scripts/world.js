class World {
  constructor() {
    this.isPaused = false
    this.tickSpeed = settings.speed
    this.tickCount = 0
    this.entities = []
    this.particles = []
    this.enemies = []
    this.droppedItems = []
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

    this.tickCount++

    tick()
  }
}