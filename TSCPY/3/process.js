let tickCount = 0

function tick() {

  tickCount++

  let data = grid.data
  let newGridChanges = []

  for(let x=0;x<data.length;x++) {
    if(!data[x]) continue
    for(let y=0;y<data[x].length;y++) {
      let tile = data[x][y]
      if(!tile) continue

      let neighbors = grid.checkTileNeighbors4(tile)

      if(tile.type == 'blue') {
        for(let n of neighbors) if(n.type == 'white') newGridChanges.push({x:n.x,y:n.y,type:'blue'})
      }
      if(tile.type == 'red') {
        for(let n of neighbors) if(n.type == 'blue') newGridChanges.push({x:n.x,y:n.y,type:'red'})
      }
      if(tile.type == 'white') {
        for(let n of neighbors) if(n.type == 'red') newGridChanges.push({x:n.x,y:n.y,type:'white'})
      }
    }
  }

  for(let change of newGridChanges) {
    grid.setTileType(change, change.type)
  }
}