class Particle {
  constructor(settings) {

    // declare default variables
    this.position = new Vec2(0,0)
    this.velocity = new Vec2(0,0)
    this.shapeType = 'rect'
    this.shape = new Vec2(0,0)
    this.color = [0,0,0,1]
    this.rotation = 0
    this.fadeAway = 0
    this.created = Date.now()
    this.forces = []

    if(settings.position != undefined) this.position = settings.position
    if(settings.velocity != undefined) this.velocity = settings.velocity
    if(settings.rotation != undefined) this.rotation = settings.rotation
    if(settings.shapeType != undefined) this.shapeType = settings.shapeType
    if(settings.shape != undefined) this.shape = settings.shape
    if(settings.color != undefined) this.color = settings.color
    if(settings.fadeAway != undefined) this.fadeAway = settings.fadeAway
    if(settings.forces != undefined) this.forces = settings.forces

    this.startColor = JSON.parse(JSON.stringify(this.color))
  }
  draw() {
    let p = this
    ctx.beginPath()
    ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${p.color[3]})`
    let PaP = p.position // particle position
    ctx.fillRect(PaP.x, PaP.y, p.shape.x, p.shape.y)
  }
  delete() {
    let index = particles.indexOf(this)
    particles.splice(index, 1)
  }
}