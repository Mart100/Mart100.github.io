class Line {
  constructor(pos1, pos2) {

    this.pos1 = new Vector(pos1.x, pos1.y)
    this.pos2 = new Vector(pos2.x, pos2.y)

    this.id = randomToken(10)

    map.lines.push(this)

    return this
  }
  draw() {
    ctx.beginPath()
    let pos1X = this.pos1.x - map.offset.x
    let pos1Y = this.pos1.y - map.offset.y
    let pos2X = this.pos2.x - map.offset.x
    let pos2Y = this.pos2.y - map.offset.y

    ctx.moveTo(pos1X, pos1Y)
    ctx.lineTo(pos2X, pos2Y)
    ctx.stroke()
  }
  drawSelected() {
    
    let pos1X = this.pos1.x - map.offset.x
    let pos1Y = this.pos1.y - map.offset.y
    let pos2X = this.pos2.x - map.offset.x
    let pos2Y = this.pos2.y - map.offset.y

    ctx.beginPath()
    ctx.arc(pos1X, pos1Y, 5, 0, 2*Math.PI)
    ctx.stroke()


    ctx.beginPath()
    ctx.arc(pos2X, pos2Y, 5, 0, 2*Math.PI)
    ctx.stroke()
  }
  export() {

    let line =  {
      pos1: {
        x: this.pos1.x,
        y: this.pos1.y,
      },
      pos2: {
        x: this.pos2.x,
        y: this.pos2.y,
      }
    }

    return line
  }
}