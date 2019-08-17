class Line {
  constructor(pos1, pos2) {

    if(pos1) this.pos1 = new Vector(pos1.x, pos1.y)
    if(pos2) this.pos2 = new Vector(pos2.x, pos2.y)

    this.color = '#000000'
    this.what = 'line'

    this.id = randomToken(10)

    map.lines.push(this)

    return this
  }
  draw() {
    ctx.strokeStyle = this.color
    ctx.lineWidth = 2

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

    ctx.strokeStyle = '#000000'
    
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
  export(settings={}) {

    let line =  {
      pos1: {
        x: this.pos1.x,
        y: this.pos1.y,
      },
      pos2: {
        x: this.pos2.x,
        y: this.pos2.y,
      },
      color: this.color
    }

    if(settings.id) line.id = this.id
    if(settings.what) line.what = this.what

    return line
  }
  import(data) {
    this.pos1 = new Vector(data.pos1.x, data.pos1.y)
    this.pos2 = new Vector(data.pos2.x, data.pos2.y)
    this.color = data.color
    if(data.id) this.id = data.id
  }
}