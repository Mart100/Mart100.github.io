class Particle {
  constructor(x, y) {
    this.pos = new Vec2(x, y)
    this.vel = new Vec2(Math.random()-0.5, Math.random()-0.5)


    this.color = randomRGB()

  }

  draw() {
    ctx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 10, 0, 2 * Math.PI)
    ctx.fill()
  }

  move() {
    this.pos.plus(this.vel)
  }

  bounceWalls() {

    if(this.pos.x < 0) this.vel.x *= -1
    if(this.pos.x > canvas.width) this.vel.x *= -1
    if(this.pos.y < 0) this.vel.y *= -1
    if(this.pos.y > canvas.height) this.vel.y *= -1

    if(this.pos.x < 0) this.pos.x = 0
    if(this.pos.x > canvas.width) this.pos.x = canvas.width
    if(this.pos.y < 0) this.pos.y = 0
    if(this.pos.y > canvas.height) this.pos.y = canvas.height

  }

  bounceParticles() {
    for(let particle of particles) {

      if(this.pos.x == particle.pos.x && this.pos.y == particle.pos.y) continue

      let vec = this.pos.clone().minus(particle.pos).multiply(-1)
      let diff = vec.getMagnitude()

      if(diff < 20) {
        let vec1 = vec.clone().setMagnitude(20).minus(vec)
        this.pos.minus(vec1)
      }
    }
  }

  gravitation() {
    for(let particle of particles) {

      if(this.pos.x == particle.pos.x && this.pos.y == particle.pos.y) continue

      let vec = this.pos.clone().minus(particle.pos).multiply(-1)
      let diff = vec.getMagnitude()

      if(diff < 200 && diff > 20) {
        let gravityForce = vec.clone().setMagnitude(1).divide(diff*2)
        this.vel = this.vel.clone().plus(gravityForce).setMagnitude(1)
      }
    }
  }
}