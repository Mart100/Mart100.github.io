function loadTile(x, y) {

  // some variables
  let tile = {}

  // create x if undefined
  if(world[x] == undefined) world[x] = []

  // noiseLayers
  let noiseLayers = {}

  for(let seedName in seeds) {
    noiseLayers[seedName] = getTileFromSeed(x, y, seedName)
  }

  let biomes = []
  for (let layer in noiseLayers) {
    if(!seeds[layer].biome) continue
    biomes.push([layer, noiseLayers[layer]])
  }
  biomes.sort((a,b) => b[1]-a[1])
  
  tile.biome = biomes[0][0]
  tile.diff = biomes[0][1] - biomes[1][1]
  tile.noiseLayers = noiseLayers
  
  // remove props in some biomes
  if(tile.biome != 'forest') tile.noiseLayers.tree = false
  if(tile.biome != 'desert') tile.noiseLayers.cactus = false

  
  // calculate color
  let tileColor = [0,0,0]
  let tileColorTotalX = 0
  for(let i=0;i<biomes.length;i++) {
    let biome = biomes[i]
    if(tile.biome == biome[0]) biome[1] *= 5
    if(tile.biome == 'ocean' && biome[0] != 'ocean') continue
    let biomeColor = seeds[biome[0]].color
    tileColor[0] += biome[1]*biomeColor[0]
    tileColor[1] += biome[1]*biomeColor[1]
    tileColor[2] += biome[1]*biomeColor[2]
    tileColorTotalX += biome[1]
  }
  tileColor[0] /= tileColorTotalX
  tileColor[1] /= tileColorTotalX
  tileColor[2] /= tileColorTotalX

  tile.color = tileColor


  // add tile to world
  world[x][y] = tile
  totalTilesLoaded++

}
function getTileFromSeed(x, y, seedName) {
  let seed = seeds[seedName]
  noise.seed(seed.seed)

  // create noise
  let Snoise = (noise.simplex2(x/seed.size, y/seed.size)+seed.plus)*seed.times

  // if split. Split
  if(seed.split) {
    if(Snoise > seed.split.at) {
      if(seed.split.plus) Snoise += seed.split.plus
      if(seed.split.times) Snoise *= seed.split.times
    }
    if(Snoise < seed.split.at) {
      if(seed.split.plus) Snoise -= seed.split.plus
      if(seed.split.times) Snoise /= seed.split.times
    }
  }

  // if switch
  if(seed.switch) {
    if(Snoise > seed.switch) Snoise = true
    else if(Snoise < seed.switch) Snoise = false
  }
  return Snoise

}
function resetWorld() {
  world = []
  totalTilesLoaded = 0
}