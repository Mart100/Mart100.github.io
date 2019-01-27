function tick() {

  if(isPaused) return
  let cGrid = JSON.parse(JSON.stringify(grid))
  let skips = []

  // loop trough grid
  for(let x=0; x<cGrid.length; x++) {

    for(let y=0; y<cGrid[x].length; y++) {
      if(cGrid[x][y] == 'n') continue

      // if in skips. Contine
      if(skips[x] != undefined && skips[x][y] != undefined) continue

      // loop trough neighbors
      for(let b=0; b<4; b++) {
      
        let won = false

        // n = neighbor
        let n = {x: 0, y: 0}

        if(b == 0) n = {x: -1, y: 0}
        if(b == 1) n = {x: 0, y: -1}
        if(b == 2) n = {x: 1, y: 0}
        if(b == 3) n = {x: 0, y: 1}

        // if neighbor undefined. Continue
        if(cGrid[x+n.x] == undefined || cGrid[x+n.x][y+n.y] == undefined) continue

        let nType = cGrid[x+n.x][y+n.y]
        let ownType = cGrid[x][y]

        // If neighbor and itself are same type. continue
        if(ownType == nType) continue

        // decide if won
        if(ownType == 'r' && nType == 'b') won = true
        if(ownType == 'g' && nType == 'r') won = true
        if(ownType == 'b' && nType == 'g') won = true
        
        // if won take over other cell
        if(won) {
          cGrid[x+n.x][y+n.y] = ownType

          // add to skips
          if(skips[x+n.x] == undefined) skips[x+n.x] = []
          skips[x+n.x][y+n.y] = true
        }
      }
    }
  }
  grid = JSON.parse(JSON.stringify(cGrid))
}
