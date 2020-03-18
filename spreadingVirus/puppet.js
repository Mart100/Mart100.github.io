class Puppet {
  constructor(x, y) {

    this.pos = new Vector(x, y)
    this.anchor = new Vector(x, y)

    this.health = 100
    this.radius = 5
    this.immunity = 0
    this.nearbyPuppets = []
    this.target = null
  }
  move() {
    if(this.target == null) return this.findTarget()
    let vec = this.target.clone().minus(this.pos)
    let dist = vec.getMagnitude()
    if(dist < 5) this.target = null
    let move = vec.setMagnitude(1)
    this.pos.plus(move)
  }
  findTarget() {
    if(this.pos.getDistanceTo(this.anchor) < 5) {
      let randomX = ((Math.random()*options.moveRange*2)-options.moveRange)+this.pos.x
      let randomY = ((Math.random()*options.moveRange*2)-options.moveRange)+this.pos.y
      let target = new Vector(randomX, randomY)
      this.target = target
    } else {
      this.target = this.anchor.clone()
    }
  }
  getNearbyPuppets() {
    this.nearbyPuppets = puppets.filter((p) => {
      let radius = 5
      if(Math.abs(this.pos.x-p.pos.x) > options.infectDistance*radius) return false
      if(Math.abs(this.pos.y-p.pos.y) > options.infectDistance*radius) return false
      return this.pos.clone().minus(p.pos).getMagnitude() < options.infectDistance*radius
    })
    /*
    for(let puppet of puppets) {
      let distance = this.pos.clone().minus(puppet.pos).getMagnitude()
      if(distance < options.infectChance*2) this.nearbyPuppets.push(puppet)
    }*/
    return this.nearbyPuppets
  }
  getWindowLocation() {
    let x = (this.pos.x - camera.x)*camera.zoom
    let y = (this.pos.y - camera.y)*camera.zoom
    return new Vector(x, y)
  }
  draw() {
    
    let pos = this.getWindowLocation()

    if(pos.x > canvas.width) return
    if(pos.x < 0) return
    if(pos.y > canvas.height) return
    if(pos.y < 0) return

    if(camera.zoom < 0.3) {
      if(Math.random() > camera.zoom*1.5) return 
    }

    let color = [0, 0, 0]
    if(this.health == 100) color = [0, 255, 0]
    if(this.health < 100) color = [0, 0, 255]
    if(this.health < 50) color = [255, 0, 0]
    if(this.health < 0) color = [0, 0, 0]

    ctx.beginPath()
    ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
    let size = this.radius*camera.zoom
    if(camera.zoom < 0.5) size = this.radius*0.5
    ctx.arc(pos.x, pos.y, size, 0, 2*Math.PI)
    ctx.fill()
    if(this.immunity != 0 && this.health == 100) {
      ctx.strokeStyle = 'blue'
      ctx.stroke()
    }
  }
}