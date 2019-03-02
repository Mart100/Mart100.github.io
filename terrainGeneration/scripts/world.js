function loadTile(x, y) {

  // some variables
  let tile = {}

  // create x if undefined
  if(world[x] == undefined) world[x] = []

  // biomes
  let biomes = {}

  biomes['ocean'] = getTileFromSeed(x, y, 'ocean')
  biomes['forest'] = getTileFromSeed(x, y, 'forest')

  let biomesArray = []
  for (let biome in biomes) biomesArray.push([biome, biomes[biome]])
  biomesArray.sort((a,b) => a[1]-b[1])
  
  tile.biome = biomesArray[0][0]
  tile.biomes = biomes
  

  // add tile to world
  world[x][y] = tile
  totalTilesLoaded++

}
function getTileFromSeed(x, y, seedName) {
  let seed = seeds[seedName]
  noise.seed(seed.seed)
  return (noise.simplex2(x/seed.size, y/seed.size)+seed.plus)*seed.times
}
function resetWorld() {
  world = []
  totalTilesLoaded = 0
}