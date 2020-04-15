class Particle {
  constructor(pos, options) {
    if(options == undefined) options = {}
    this.pos = pos
    this.size = options.size || 5
    this.duration = options.duration || 1000
    this.text = options.text
    this.textSize = options.textSize || 20
    this.color = options.color
    world.particles.push(this)
    setTimeout(() => {
      let idx = world.particles.indexOf(this)
      if(idx > -1) world.particles.splice(idx, 1)
    }, this.duration)
  }
}