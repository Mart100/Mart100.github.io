$(() => {
  // keyboard
  $(document).on('keydown', (event) => { keys[event.keyCode] = true  })
  $(document).on('keyup',   (event) => { keys[event.keyCode] = false })

  // mouse move
  $('#canvas').on('mousemove', (event) => {
    mouse.pos.x = event.clientX
    mouse.pos.y = event.clientY
    displayTileInfo()
  })

  // listen for zooming
  $(document).on('DOMMouseScroll mousewheel', (event) => {

    let mouseGridPos = grid.windowToGridPos(event.clientX, event.clientY)
    // zoom out
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      grid.zoom(0.1, mouseGridPos)
    } else {
      grid.zoom(-0.1, mouseGridPos)
    }
  })
})