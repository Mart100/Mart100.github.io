class World {
  constructor() {
    this.time = 0
    this.day = 0
    this.connectons = []
    this.isPaused = false
    this.tickSpeed = 1000
    this.tickCount = 0
    this.rooms = []
    this.grid = new Grid()

    setInterval(() => { 
      for(let i=0;i<2; i++) this.tick() 
    }, 1000/this.tickSpeed)

  }
  tick() {
    if(this.isPaused) return

    this.tickCount++

    this.time += 0.005
    this.time = Math.round(this.time*1000)/1000
    let timeFormatted = Math.floor(this.time) + ':' + Math.floor((this.time % 1)*100)
    infoPanel.add('Time', timeFormatted)

    if(this.time > 10) {
      this.time = 0
      this.day++
      infoPanel.add('Day', this.day)
    }

  
    for(let connecton of this.connectons) connecton.tick()
  }
  placeRandomConnectons(pos, amount, range) {
    let startConnectonsAmount = this.connectons.length
    let tries = 0
    while(this.connectons.length-startConnectonsAmount < amount) {
      tries++
      if(tries > amount*10) return
      let randomX = pos.x+(Math.floor(Math.random()*range) - (range/2))
      let randomY = pos.y+(Math.floor(Math.random()*range) - (range/2))
      if(!this.grid.data[randomX] || !this.grid.data[randomX][randomY]) continue
      let tile = this.grid.data[randomX][randomY]
      let dominantType = tile.types[tile.types.length-1]
      if(dominantType == 'hall') {
        let connecton = new Connecton({pos: {x: randomX, y: randomY}})
        this.connectons.push(connecton)
      }
    }
  }
  findRoomByTile(pos) {
    for(let room of this.rooms) {
      for(let roomPos of room.positions) {
        if(roomPos.x == pos.x && roomPos.y == pos.y) {
          return room
        }
      }
    }
  }
}