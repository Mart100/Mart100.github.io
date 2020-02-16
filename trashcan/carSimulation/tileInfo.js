
function displayTileInfo() {
  let pos = grid.windowToGridPos(mouse.pos.x, mouse.pos.y)
  let x = pos.x
  let y = pos.y

  let tile = grid.getTile(x, y)

  debugPanel.add('tileX', x)
  debugPanel.add('tileY', y)
}
