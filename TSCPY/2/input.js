$(() => {
  // keyboard
  $(document).on('keydown', (event) => { 
    keys[event.keyCode] = true

    // 1
    if(event.keyCode == 49) {
      world.randomizeWorld()
    }

    // P
    if(event.keyCode == 80) world.isPaused = !world.isPaused
    if(world.isPaused) $('#pausedAlert').fadeIn()
    else $('#pausedAlert').fadeOut()
  })
  $(document).on('keyup',   (event) => { keys[event.keyCode] = false })

  // mouse move
  $('#canvas').on('mousemove', (event) => {
    mouse.pos.x = event.clientX
    mouse.pos.y = event.clientY

    displayTileInfo()
  })

  // listen for zooming
  $(document).on('DOMMouseScroll mousewheel', (event) => {

    let mouseGridPos = world.grid.windowToGridPos(event.clientX, event.clientY)
    // zoom out
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      world.grid.zoom(0.1, mouseGridPos)
    } else {
      world.grid.zoom(-0.1, mouseGridPos)
    }
  })
})