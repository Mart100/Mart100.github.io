$(() => {
  // keyboard
  $(document).on('keydown', (event) => { 
    keys[event.keyCode] = true

  })
  $(document).on('keyup',   (event) => { keys[event.keyCode] = false })

  // mouse move
  $('#canvas').on('mousemove', (event) => {
    mouse.pos.x = event.clientX
    mouse.pos.y = event.clientY

    let gridPos = grid.windowToGridPos(mouse.pos.x, mouse.pos.y)

    grid.setTileType(gridPos, 'black')

    let neighbors8 = grid.checkTileNeighbors8(grid.getTile(gridPos.x, gridPos.y))
    for(let n of neighbors8) grid.setTileType(n, 'blue')

    let neighbors4 = grid.checkTileNeighbors4(grid.getTile(gridPos.x, gridPos.y))
    for(let n of neighbors4) grid.setTileType(n, 'red')

    setTimeout(() => {
      grid.setTileType(gridPos, 'white')
    }, 100)
  })

  // listen for zooming
  $(document).on('DOMMouseScroll mousewheel', (event) => {

    // zoom out
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      grid.zoom(0.1)
    } else {
      grid.zoom(-0.1)
    }
  })
})