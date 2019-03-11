class Particle {
  constructor(settings) {

    // declare default variables
    this.position = new Vec2(0,0)
    this.velocity = new Vec2(0,0)
    this.shape = new Vec2(0,0)
    this.created = Date.now()
    this.fadeAway = 0
    this.color = [0,0,0,1]

    if(settings.position != undefined) this.position = settings.position
    if(settings.velocity != undefined) this.velocity = settings.velocity
    if(settings.fadeAway != undefined) this.fadeAway = settings.fadeAway
    if(settings.shape != undefined) this.shape = settings.shape
    if(settings.color != undefined) this.color = settings.color

    this.startColor = JSON.parse(JSON.stringify(this.color))
  }
  delete() {
    let index = particles.indexOf(this)
    particles.splice(index, 1)

  }
}