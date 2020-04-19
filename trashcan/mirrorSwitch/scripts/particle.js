class Particle {
  constructor(settings) {

    // declare default variables
    this.position = new Vec2(0,0)
    this.velocity = new Vec2(0,0)
    this.size = new Vec2(0,0)
    this.created = Date.now()
    this.fadeAway = 0
    this.color = [0,0,0,1]
    this.forces = []
    this.settings = settings

    if(settings.position != undefined) this.position = settings.position
    if(settings.velocity != undefined) this.velocity = settings.velocity
    if(settings.fadeAway != undefined) this.fadeAway = settings.fadeAway
    if(settings.size != undefined) this.size = settings.size
    if(settings.color != undefined) this.color = settings.color
    if(settings.forces != undefined) this.forces = settings.forces

    this.startColor = JSON.parse(JSON.stringify(this.color))
  }
  draw() {
    let p = this
    ctx.beginPath()
    ctx.strokeStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${p.color[3]})`
    let PaP = p.position // particle position
    ctx.lineWidth = 1
    ctx.moveTo(PaP.x+0.5, PaP.y)
    ctx.lineTo(PaP.x+0.5, PaP.y + p.size.y)
    ctx.stroke()
  }
  delete() {
    let index = particles.indexOf(this)
    particles.splice(index, 1)

  }
  tick() {

    let p = this

    // fadeAway
    if(p.fadeAway) {
      let time = Date.now() - p.created
      p.color[3] = p.startColor[3] - (time/p.fadeAway)*p.startColor[3]
      if(p.color[3] < 0) p.delete()
    }

    // Velocity
    p.position.x += p.velocity.x
    p.position.y += p.velocity.y

  }
}