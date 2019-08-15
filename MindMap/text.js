class Text {
  constructor(pos) {

    this.position = new Vector(pos.x, pos.y)
    this.size = 20
    this.text = ''
    this.cursorPosition = 0

    this.id = randomToken(10)

    map.texts.push(this)

    return this
  }
  draw() {
    ctx.font = `${this.size}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    let posX = this.position.x - map.offset.x
    let posY = this.position.y - map.offset.y

    ctx.fillText(this.text, posX, posY)
  }
  drawSelected() {
    ctx.font = `${this.size}px Arial`
    let textWidth = ctx.measureText(this.text).width

    let posX = this.position.x - map.offset.x
    let posY = this.position.y - map.offset.y
    let underLineY = Math.floor(posY+(this.size/2))

    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(posX-(textWidth/2), underLineY)
    ctx.lineTo(posX+(textWidth/2), underLineY)
    ctx.stroke()

    // draw move cube
    ctx.beginPath()
    ctx.drawImage(images.panning, posX-7, posY-30, 14, 14)
    ctx.strokeRect(posX-7, posY-30, 14, 14)

    // cursor
    ctx.lineWidth = 2
    let ms = new Date().getMilliseconds()
    let appear = (ms>500)
    let cursorOffset = ctx.measureText((this.text+'').slice(-(this.text.length - this.cursorPosition))).width
    if(this.text.length == this.cursorPosition) cursorOffset = 0
    
    if(modes.text.lastCursorMove > Date.now()-500) appear = true

    if(appear) {
      let cursorX = Math.floor(posX+(textWidth/2) + 1 - cursorOffset)-0.5
      ctx.beginPath()
      ctx.moveTo(cursorX, posY-(this.size/2) - 5)
      ctx.lineTo(cursorX, posY+(this.size/2) + 5)
      ctx.stroke()
    }
  }
  export() {

    let text =  {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      text: this.text,
      size: this.size
    }

    return text
  }
}