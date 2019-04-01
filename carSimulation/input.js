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

    // zoom out
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      grid.zoom(1.1)
      /*
      let zoomChange = camera.zoom/10
      camera.zoom -= zoomChange

      let c = camera.pos
      let t = getTileUnderMouse(mouse.pos.x, mouse.pos.y) // tile
      let tcX = t.x-c.x
      let tcY = t.y-c.y
      tcX /= 10
      tcY /= 10
      camera.pos.x -= tcX
      camera.pos.y -= tcY

      debugPanel.add('zoom', camera.zoom)
      debugPanel.add('posX', camera.pos.x)
      debugPanel.add('posY', camera.pos.y)*/
    } 
    else {
      grid.zoom(0.9)
    }
  })
})