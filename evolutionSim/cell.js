class Cell {
  constructor(genetics) {

    if(genetics == undefined) this.random()
    else {
      this.stateLines = genetics.stateLines
      this.color = genetics.color
    }

    this.pos
    this.state = 'none'
  }
  random() {
    this.stateLines = {
      attack: Math.random(),
      food: Math.random(),
      run: Math.random(),
    }
    this.color = randomRGB()
  }
  mutate(amount) {

  }
}