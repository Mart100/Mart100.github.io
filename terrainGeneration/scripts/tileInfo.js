
function displayTileInfo() {
  let pos = getTileUnderMouse(mouse.pos.x, mouse.pos.y)
  let x = pos.x
  let y = pos.y

  if(!world[x] || !world[x][y]) loadTile(x, y)

  let tile = world[x][y]

  let html = `
  <b>
    PosX: ${x}<br>
    PosY: ${y}<br>
    Biome: ${tile.biome}<br>
    Biomes: ${JSON.stringify(tile.noiseLayers)}<br>
    Diff: ${tile.diff}
  </b>
  `
  $('#tileInfo').html(html)
}



function getTileUnderMouse(mx, my) {
  // Get tile
  mx /= settings.detail
  my /= settings.detail

  let x = mx/camera.zoom + camera.pos.x
  let y = my/camera.zoom + camera.pos.y

  x = Math.round(x)
  y = Math.round(y)
  return {x: x, y: y}
}