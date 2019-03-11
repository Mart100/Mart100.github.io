$(() => {
  // on click
  $('#canvas').on('mousedown', (event) => {
    let gridPos = grid.windowToGridPos(event.clientX, event.clientY)
    $('#tip-fire').remove()
    grid.setTile(gridPos.x, gridPos.y, 'temperature', 1000)
  })

  // on mousemove
  $('#canvas').on('mousemove', (event) => {
    mouse.pos.x = event.clientX
    mouse.pos.y = event.clientY
    displayTileInfo()
  })
})