class Shape {
  constructor(pos1, pos2) {

    this.pos1 = new Vector(pos1.x, pos1.y)
    this.pos2 = new Vector(pos2.x, pos2.y)
    this.color = '#000000'
    this.fill = true
    this.type = 'rectangle'

    this.id = randomToken(10)

    map.shapes.push(this)

    return this
  }
  draw() {
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.color

    let pos1X = this.pos1.x - map.offset.x
    let pos1Y = this.pos1.y - map.offset.y
    let pos2X = this.pos2.x - map.offset.x
    let pos2Y = this.pos2.y - map.offset.y
    let width = pos2X - pos1X
    let height = pos2Y - pos1Y

    if(width < 0) {
      let newPos1X = this.pos2.x
      let newPos2X = this.pos1.x
      this.pos1.x = newPos1X
      this.pos2.x = newPos2X
    }
    if(height < 0) {
      let newPos1Y = this.pos2.y
      let newPos2Y = this.pos1.y
      this.pos1.y = newPos1Y
      this.pos2.y = newPos2Y
    }

    ctx.beginPath()

    if(this.type == 'rectangle') {
      ctx.rect(pos1X, pos1Y, width, height)
      if(this.fill) ctx.fill()
      else ctx.stroke()
    }
    if(this.type == 'ellipse') {

      let width = pos2X - pos1X
      let height = pos2Y - pos1Y
      ctx.save()
      ctx.translate(pos1X+width/2, pos1Y+height/2)
      ctx.scale(1, height/width)
      ctx.beginPath()
      ctx.arc(0, 0, width/2, 0, 2 * Math.PI)
      ctx.restore()
      ctx.lineWidth = 4
      if(this.fill) ctx.fill()
      else ctx.stroke()
    }

  }
  drawSelected() {
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 5

    let pos1X = this.pos1.x - map.offset.x
    let pos1Y = this.pos1.y - map.offset.y
    let pos2X = this.pos2.x - map.offset.x
    let pos2Y = this.pos2.y - map.offset.y
    let width = pos2X - pos1X
    let height = pos2Y - pos1Y

    ctx.beginPath()
    ctx.strokeRect(pos1X, pos1Y, width, height)
  }
  export() {

    let shape = {
      pos1: {
        x: this.pos1.x,
        y: this.pos1.y,
      },
      pos2: {
        x: this.pos2.x,
        y: this.pos2.y,
      },
      type: this.type,
      color: this.color,
      fill: this.fill
    }

    return shape
  }
}