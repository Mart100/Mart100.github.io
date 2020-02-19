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
      if(!connecton.married && !this.married && this.connectons.length == 1) {
        let owner = this.connectons[0]
        if(connecton.gender == owner.gender) return false
        if(connecton.age < 20 && owner.age < 20) return false
        if(Math.abs(connecton.age-owner.age) > 10) return false
        if(Math.random() > 0.9) return false
        connecton.married = owner
        owner.married = connecton
        return true
      }

      if(!connecton.parents) return false
      if(connectons.includes(connecton.parents[0])) return true
      if(connectons.includes(connecton.parents[1])) return true
      return false
    }

    if(this.connectons.length < this.slots) return true
  }
}