class Vector {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z

    if(x == undefined) this.x = 0
    if(y == undefined) this.y = 0
    if(z == undefined) this.z = 0
  }
  multiply(a) {
    // if its another vector
    if(a.x != undefined) {
      this.x *= a.x
      this.y *= a.y
      this.z *= a.z
      return this
    }
    // if its a number
    else if(!isNaN(a)) {
      this.x *= a
      this.y *= a
      this.z *= a
      return this
    }
  }
  plus(a) {
    // if its another vector
    if(a.x != undefined) {
      this.x += a.x
      this.y += a.y
      this.z += a.z
      return this
    }
    // if its a number
    else if(!isNaN(a)) {
      this.x += a
      this.y += a
      this.z += a
      return this
    }
  }
  minus(a) {
    // if its another vector
    if(a.x != undefined) {
      this.x -= a.x
      this.y -= a.y
      this.z -= a.z
      return this
    }
    // if its a number
    else if(!isNaN(a)) {
      this.x -= a
      this.y -= a
      this.z -= a
      return this
    }
  }
  divide(a) {
    // if its another vector
    if(a.x != undefined) {
      this.x /= a.x
      this.y /= a.y
      this.z /= a.z
      return this
    }
    // if its a number
    else if(!isNaN(a)) {
      this.x /= a
      this.y /= a
      this.z /= a
      return this
    }
  }
  edit(a, To) {

    if(a == 'x') this.x = To
    if(a == 'y') this.y = To
    if(a == 'z') this.z = To
    return this
  }
  rotate(axis, angle) {
    // new rotated Vector coords
    let x1, y1, z1

    // if all
    if(axis == 'all') {
      this.rotate('y', angle.y)
      this.rotate('z', angle.z)
      this.rotate('x', angle.x)
      return this
    }

    if(axis == 'x') {
      x1 = this.x
      y1 = this.y * Math.cos(angle) - this.z * Math.sin(angle)
      z1 = this.y * Math.sin(angle) + this.z * Math.cos(angle)
    }
    if(axis == 'y') {
      x1 = this.x * Math.cos(angle) + this.z * Math.sin(angle)
      y1 = this.y
      z1 =-this.x * Math.sin(angle) + this.z * Math.cos(angle)
    }
    if(axis == 'z') {
      x1 = this.x * Math.cos(angle) - this.y * Math.sin(angle)
      y1 = this.x * Math.sin(angle) + this.y * Math.cos(angle)
      z1 = this.z
    }

    this.x = x1
    this.y = y1
    this.z = z1
    
    return this
  }
  string() {
    return this.x+', '+this.y+', '+this.z
  }
  setMagnitude(a) {
    let magnitude = this.getMagnitude()

    let x = (this.x/magnitude)*a
    let y = (this.y/magnitude)*a
    let z = (this.z/magnitude)*a

    this.x = x
    this.y = y
    this.z = z

    return this
  }
  getMagnitude() {
    let magnitude = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
    return magnitude
  }
  clone() {
    return new Vector(this.x, this.y, this.z)
  }
}