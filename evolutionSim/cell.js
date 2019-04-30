class Cell {
  constructor(genetics) {

    if(genetics == undefined) this.random()
    else {
      this.brain = genetics.brain
      this.color = genetics.color
      this.pos = genetics.pos
      this.speed = genetics.speed
    }

    this.state = 'none'
    this.saturation = 100
    this.dead = false
    this.id = randomToken(10)
    this.age = 0
    this.lastPare = 0
    this.pareReady = 0
    this.moving = new Vector(0, 0)
    this.gender = Math.round(Math.random())

    cells[this.id] = this
  }
  random() {
    this.brain = {
      attack: Math.random(),
      eating: Math.random()*100,
      run: Math.random(),
    }
    this.speed = Math.random()
    this.color = randomRGB()
    this.pos = new Vector(randomRange(0, window.innerWidth), randomRange(0, window.innerHeight))
  }
  mutate(amount) {

  }
  die() {
    if(this.dead) return
    this.dead = true
    this.state = 'none'
    this.moving = new Vector(0, 0)
    this.decomposing = 100
  }
  remove() {
    delete cells[this.id]
  }
}