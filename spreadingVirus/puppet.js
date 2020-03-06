class Puppet {
  constructor(x, y) {

    this.pos = {}
    this.pos.x = x
    this.pos.y = y

    this.health = 100
    this.radius = 5
    this.immunity = 0
  }
  draw() {
    
    let color = [0, 0, 0]

    if(this.health == 100) color = [0, 255, 0]
    if(this.health < 100) color = [0, 0, 255]
    if(this.health < 50) color = [255, 0, 0]
    if(this.health < 0) color = [0, 0, 0]

    ctx.beginPath()
    ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI)
    ctx.fill()
    if(this.immunity != 0 && this.health == 100) {
      ctx.strokeStyle = 'blue'
      ctx.stroke()
    }
  }
}

/*
    let color = [0, 0, 0]
    let hc = this.health*2.55
    color[0] = 255-hc
    color[1] = hc
*/