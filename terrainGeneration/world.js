let backgroundNoiseSettings = {
  size: 20,
  plus: 1,
  times: 100
}





function createWorld() {
  createArray()
  addBackground()
}

function createArray() {
  for(let x=0;x<worldSize;x++) {
    if(world[x] == undefined) world[x] = []

    for(let y=0;y<worldSize;y++) {
      let tile = {
        strength: 0
      }
      world[x][y] = tile
    }
  }
  console.log('Done world array')
}

function addBackground() {
  noise.seed(seed)
  bns = backgroundNoiseSettings
  for(let x=0;x<worldSize;x++) {
    for(let y=0;y<worldSize;y++) {
      world[x][y].strength = (noise.simplex2(x/bns.size, y/bns.size)+bns.plus)*bns.times
    }
  }
  console.log('Done world background')
}

function loadTile(x, y) {
  noise.seed(seed)
  bns = backgroundNoiseSettings
  if(world[x] == undefined) world[x] = []
  let tile = {
    strength: (noise.simplex2(x/bns.size, y/bns.size)+bns.plus)*bns.times
  }
  world[x][y] = tile

}