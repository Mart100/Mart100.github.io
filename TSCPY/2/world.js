class World {
  constructor() {
    this.isPaused = false
    this.tickSpeed = 5
    this.tickCount = 0
    this.lastTick = Date.now()
    this.grid = new Grid()
    //this.cells = []

    setInterval(() => { 
      for(let i=0;i<2; i++) this.tick() 
    }, 1000/this.tickSpeed)

  }
  randomizeWorld() {
    let data = this.grid.data
    for(let x=0;x<data.length;x++) {
      if(!data[x]) continue
      for(let y=0;y<data[x].length;y++) {
        let tile = data[x][y]
        if(tile != undefined && tile.type != undefined) {
          this.grid.createTile(x, y)
          tile = data[x][y]
        }

        let rand = Math.random()
        if(rand < 0.1) this.grid.setTileProperty(tile.x, tile.y, 'type', '+')
        else if(rand < 0.2) this.grid.setTileProperty(tile.x, tile.y, 'type', '-')

        //if(x % 10 == 0) this.grid.setTileProperty(tile.x, tile.y, 'type', '+')
        //else this.grid.setTileProperty(tile.x, tile.y, 'type', '-')
      }
    }
  }
  tick() {
    if(this.isPaused) return

    let tickDuration = Date.now()-this.lastTick
    infoPanel.add('TickDuration', tickDuration)

    this.tickCount++
    this.lastTick = Date.now()

    infoPanel.add('tickCount', this.tickCount)

    let grid = this.grid
    let data = this.grid.data

    let newGridChanges = []


    for(let x=0;x<data.length;x++) {
      if(!data[x]) continue
      for(let y=0;y<data[x].length;y++) {
        let tile = data[x][y]
        if(!tile) continue
        if(tile.type == undefined) continue
        if(tile.type == '') continue

        let neighbors = this.grid.checkTileNeighbors8(tile)
        let neighborTypes = this.calculateNeighborsTypes(tile)

        if(tile.type == '-') {
          if(neighborTypes['+'] > 1)  newGridChanges.push({x:tile.x,y:tile.y,type:''}) //grid.setTileType(tile, '')
          if(neighborTypes['+'] < 1) {
            newGridChanges.push({x:tile.x-1,y:tile.y,type:'-'})
            newGridChanges.push({x:tile.x,y:tile.y-1,type:'-'})
            newGridChanges.push({x:tile.x+1,y:tile.y,type:'-'})
            newGridChanges.push({x:tile.x,y:tile.y+1,type:'-'})
          }
        }
        if(tile.type == '+') {
          if(neighborTypes['-'] > 3) {
            newGridChanges.push({x:tile.x-1,y:tile.y,type:'+'}) //grid.setTileType(neighbors[0], '+')
            newGridChanges.push({x:tile.x,y:tile.y-1,type:'+'})  //grid.setTileType(neighbors[2], '+')
            newGridChanges.push({x:tile.x+1,y:tile.y,type:'+'})  //grid.setTileType(neighbors[4], '+')
            newGridChanges.push({x:tile.x,y:tile.y+1,type:'+'})  //grid.setTileType(neighbors[6], '+')
          }
          if(neighborTypes['-'] < 2) newGridChanges.push({x:tile.x,y:tile.y,type:''}) //grid.setTileType(tile, '')
        }
      }
    }
    for(let change of newGridChanges) {
      if(data[change.x] && data[change.x][change.y] && data[change.x][change.y].type != '' && change.type != '') continue
      grid.setTileProperty(change.x, change.y, 'type', change.type)
    }
  }
  randomNeighbor(neighbors) {
    let rn = 0
    while(rn.type == undefined) {
      rn = neighbors[Math.floor(Math.random()*neighbors.length)]
    }
    return rn
  }
  calculateNeighborsTypes(tile) {
    let neighbors = this.grid.checkTileNeighbors8(tile)
    let blueNeighbors = 0
    let redNeighbors = 0
    for(let n of neighbors) {
      if(n.type == '-') blueNeighbors++
      if(n.type == '+') redNeighbors++
    }

    let neighborTypes = {'-': blueNeighbors, '+': redNeighbors}
    return neighborTypes
  }
}