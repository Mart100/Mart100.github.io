class Vector2D {
    constructor(x, y) {
      this.x = x
      this.y = y

      if(x == undefined) this.x = 0
      if(y == undefined) this.y = 0
    }
    multiply(a) {
      // if its another vector
      if(With.x != undefined) {
        this.x *= a.x
        this.y *= a.y
        return this
      }
      // if its a number
      else if(!isNaN(With)) {
        this.x *= a
        this.y *= a
        return this
      }
    }
    plus(a) {
      // if its another vector
      if(a.x != undefined) {
        this.x += a.x
        this.y += a.y
        return this
      }
      // if its a number
      else if(!isNaN(a)) {
        this.x += a
        this.y += a
        return this
      }
    }
    minus(a) {
      // if its another vector
      if(a.x != undefined) {
        this.x -= a.x
        this.y -= a.y
        return this
      }
      // if its a number
      else if(!isNaN(a)) {
        this.x -= a
        this.y -= a
        return this
      }
    }
    divide(With) {
      // if its another vector
      if(With.x != undefined) {
        this.x /= With.x
        this.y /= With.y
        return this
      }
      // if its a number
      else if(!isNaN(With)) {
        this.x /= With
        this.y /= With
        return this
      }
    }
    rotate(angle) {
      let x1 = Math.cos(angle) * this.x - Math.sin(angle) * this.y
      let y1 = Math.sin(angle) * this.x + Math.cos(angle) * this.y

      this.x = x1
      this.y = y1
      
      return this
    }
    string() {
      return this.x+', '+this.y
    }
    setMagnitude(a) {
      let magnitude = this.getMagnitude()

      let x = (this.x/magnitude)*a
      let y = (this.y/magnitude)*a

      this.x = x
      this.y = y

      return this
    }
    getMagnitude() {
      let magnitude = Math.sqrt(this.x*this.x + this.y*this.y)
      return magnitude
    }
    clone() {
      return new Vector2D(this.x, this.y)
    }
    set(a, b) {
      if(a == 'x') this.x = b
      if(a == 'y') this.y = b
      if(a == 'all') {
        this.x = b.x
        this.y = b.y
      }
      return this
  }
}