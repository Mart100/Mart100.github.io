class Rect {
  constructor(pos1, pos2) {

    // create corners
    this.corners = [
      new Vector2D(pos1.x, pos1.y),
      new Vector2D(pos2.x, pos1.y),
      new Vector2D(pos2.x, pos2.y),
      new Vector2D(pos1.x, pos2.y)
    ]
    this.rot = 0
    this.pos1 = pos1
    this.pos2 = pos2
  }
  rotate(angle) {
    let pos = this.getPos()
    this.rot += angle


    // loop trough corners and rotate them
    for(let corner of this.corners) {
      corner.minus(pos)
      corner.rotate(angle)
      corner.plus(pos)
    }

    return this
  }
  getPos() {
    let average = new Vector2D()

    // sum all corners into average. Then divide
    for(let corner of this.corners) average.plus(corner)
    average.divide(this.corners.length)

    return average
  }
  removeRotation() {
    this.rotate(-this.rot)
    return this
  }
  clone() {
    let clone = new Rect(this.pos1, this.pos2)
    clone.rotate(this.rot)
    return clone
  }
}