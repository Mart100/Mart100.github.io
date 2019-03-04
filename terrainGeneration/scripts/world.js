function loadTile(x, y) {

  // some variables
  let tile = {}

  // create x if undefined
  if(world[x] == undefined) world[x] = []

  // biomes
  let biomes = {}

  for(let seedName in seeds) {
    biomes[seedName] = getTileFromSeed(x, y, seedName)
  }

  let biomesArray = []
  for (let biome in biomes) biomesArray.push([biome, biomes[biome]])
  biomesArray.sort((a,b) => b[1]-a[1])
  
  tile.biome = biomesArray[0][0]
  tile.biomes = biomes
  

  // add tile to world
  world[x][y] = tile
  totalTilesLoaded++

}
function getTileFromSeed(x, y, seedName) {
  let seed = seeds[seedName]
  noise.seed(seed.seed)
  let Snoise = (noise.simplex2(x/seed.size, y/seed.size)+seed.plus)*seed.times
  if(seed.split) {
    if(Snoise > seed.split.at) Snoise += seed.split.plus
    if(Snoise < seed.split.at) Snoise -= seed.split.plus
  }
  return Snoise

}
function resetWorld() {
  world = []
  totalTilesLoaded = 0
}