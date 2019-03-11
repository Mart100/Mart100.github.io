
function displayTileInfo() {
  let pos = grid.windowToGridPos(mouse.pos.x, mouse.pos.y)
  let x = pos.x
  let y = pos.y

  let tile = grid.getTile(x, y)

  if(tile == undefined) return

  let html = `
  <b>
    PosX: ${x}<br>
    PosY: ${y}<br>
    Durability: ${tile.durability}<br>
    Temp: ${tile.temperature}<br>
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