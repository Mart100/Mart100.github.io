function tick() {
  if(settings.isPaused) return
  let start = performance.now()
  tileTick()

  displayTileInfo()
  debugPanel.add('tickTime', performance.now()-start)
}

function tileTick() {
  let sped = settings.speed
  grid.forEveryTile((x, y, tile) => {

    // decrease durability of wood
    if(tile.temperature > 100 && tile.durability > 0) {
      let newDurability = tile.durability - tile.temperature/sped
      grid.setTile(x, y, 'durability', newDurability)
      tile.temperature += tile.temperature/sped
    }

    if(tile.temperature > 20) {
      // spread heat to neighbors
      if(x != grid.width-1)  grid.setTile(x+1, y, 'temperature', (grid.getTile(x+1, y).temperature + tile.temperature/sped/4))
      if(y != 0)             grid.setTile(x, y-1, 'temperature', (grid.getTile(x, y-1).temperature + tile.temperature/sped/4))
      if(y != grid.height-1) grid.setTile(x, y+1, 'temperature', (grid.getTile(x, y+1).temperature + tile.temperature/sped/4))
      if(x != 0)             grid.setTile(x-1, y, 'temperature', (grid.getTile(x-1, y).temperature + tile.temperature/sped/4))
      tile.temperature -= tile.temperature/sped

      tile.temperature -= tile.temperature/sped/35
    }
    
  })
}

function fadeAway(particle) {
  if(particle.fadeAway) {
    let time = Date.now() - particle.created
    particle.color[3] = particle.startColor[3] - (time/particle.fadeAway)*particle.startColor[3]
    if(particle.color[3] < 0) particle.delete()
  }
}