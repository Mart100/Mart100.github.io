class Room {
  constructor(pos, type, options) {
    this.type = type

    if(pos == undefined) return

    this.positions = [pos]
    this.slots = 0
    this.connectons = []
    
    this.id = 0
    this.randomID()

    world.rooms.push(this)
  }
  addPos(pos) {
    this.positions.push(pos)
    this.slots += 0.2
  }
  randomID() {
    let a = 'abcdefghijklmnopqrstuvwxyz'
    let s = ''
    for(let i=0;i<10;i++) s += a[Math.floor(Math.random()*a.length)]
    return s
  }
  addConnecton(connecton) {
    if(this.connectons.includes(connecton)) return
    this.connectons.push(connecton)
  }
  isConnectonAllowed(connecton) {

    let connectons = this.connectons

    if(connectons.length == 0) return true
    if(connectons.includes(connecton)) return true

    if(this.type == 'house') {

      // marrying
      if(!connecton.married && !this.married) {
        if(connecton.gender == this.gender) return false
        //if(connecton)
      }

      if(!connecton.parents) return false
      if(connectons.includes(connecton.parents[0])) return true
      if(connectons.includes(connecton.parents[1])) return true
      return false
    }

    if(this.connectons.length < this.slots) return true
  }
}