const snippets = [
  {
    title: 'template',
    keywords: ['abc', 'test'],
    code: ``,
    language: 'scratch'
  },
  {
    title: 'Clearing screen of canvas',
    keywords: ['canvas', 'clear', 'screen', 'reset', 'refresh'],
    code: `ctx.clearRect(0, 0, canvas.width, canvas.height)`,
    language: 'javascript'

  },
  {
    title: 'Request animation frame',
    keywords: ['request', 'animation', 'frame', 'loop', 'draw'],
    code: `window.requestAnimationFrame(frame)`,
    language: 'javascript'
  },
  {
    title: 'Draw Rectangle on canvas',
    keywords: ['rectangle', 'square', 'rect', 'canvas', 'draw'],
    code: `ctx.fillRect(x, y, width, height)`,
    language: 'javascript'
  },
  {
    title: '3D vector class',
    keywords: ['3d', 'vector', 'class'],
    code: `class Vector {
    constructor(x, y, z) {
      this.x = x
      this.y = y
      this.z = z

      if(x == undefined) this.x = 0
      if(y == undefined) this.y = 0
      if(z == undefined) this.z = 0
    }
    multiply(With) {
      // if its another vector
      if(With.x != undefined) {
        this.x *= With.x
        this.y *= With.y
        this.z *= With.z
        return this
      }
      // if its a number
      else if(!isNaN(With)) {
        this.x *= With
        this.y *= With
        this.z *= With
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
    divide(With) {
      // if its another vector
      if(With.x != undefined) {
        this.x /= With.x
        this.y /= With.y
        this.z /= With.z
        return this
      }
      // if its a number
      else if(!isNaN(With)) {
        this.x /= With
        this.y /= With
        this.z /= With
        return this
      }
    }
    edit(What, To) {

      if(What == 'x') this.x = To
      if(What == 'y') this.y = To
      if(What == 'z') this.z = To
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
    set(a, b) {
      if(a == 'x') this.x = b
      if(a == 'y') this.y = b
      if(a == 'z') this.z = b
      if(a == 'all') {
        this.x = b.x
        this.y = b.y
        this.z = b.z
      }
      return this
  }
  to2D() {
    this.z = 0
    return this
  }
}`,
    language: 'javascript'
  },
  {
    title: '2D vector class',
    keywords: ['2d', 'vector', 'class'],
    code: `class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y

    if(x == undefined) this.x = 0
    if(y == undefined) this.y = 0
  }
  multiply(a) {
    // if its another vector
    if(a.x != undefined) {
      this.x *= a.x
      this.y *= a.y
      return this
    }
    // if its a number
    else if(!isNaN(a)) {
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
  divide(a) {
    // if its another vector
    if(a.x != undefined) {
      this.x /= a.x
      this.y /= a.y
      return this
    }
    // if its a number
    else if(!isNaN(a)) {
      this.x /= a
      this.y /= a
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
    return this.x+' - '+this.y
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
    return new Vector(this.x, this.y)
  }
}`,
    language: 'javascript'
  },
  {
    title: 'overflow types',
    keywords: ['overflow'],
    language: 'css',
    code: `/* Keyword values */
overflow: visible;
overflow: hidden;
overflow: scroll;
overflow: auto;
overflow: hidden visible;`
  },
  {
    title: 'transitions',
    keywords: ['transition', 'animation'],
    language: 'css',
    code: `
  transition-property: width, height, margin, filter, opacity, font-size;
  transition-duration: .2s;

  transition: opacity .2s;`
  },
  {
    title: 'border',
    keywords: ['border'],
    language: 'css',
    code: `border: 2px solid rgb(0, 0, 0);`,
  },
  {
    title: 'copy text to clipboard',
    keywords: ['copy', 'text', 'clipboard'],
    language: 'javascript',
    code: `
      $('').select()
      document.execCommand("copy")`,
  },
  {
    title: 'rotate',
    keywords: ['rotate', 'transform', 'degrees'],
    language: 'css',
    code: `transform: rotate(90deg);`,
  },
  {
    title: 'box-shadow',
    keywords: ['box', 'shadow'],
    language: 'css',
    code: `box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);`,
  },
  {
    title: 'template',
    keywords: ['abc', 'test'],
    language: 'scratch',
    code: ``,
  },
  {
    title: 'template',
    keywords: ['abc', 'test'],
    language: 'scratch',
    code: ``,
  },
  {
    title: 'template',
    keywords: ['abc', 'test'],
    language: 'scratch',
    code: ``,
  },
]