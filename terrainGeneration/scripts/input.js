$(() => {
  // listen for keys up and down
  $(document).on('keydown', (event) => { keys[event.keyCode] = true  })
  $(document).on('keyup',   (event) => { keys[event.keyCode] = false })

  // listen for mouse down/up
  $(document).on('mousedown', () => { mouse.down = true  })
  $(document).on('mouseup', () => { mouse.down = false  })

  // listen for zooming
  $(document).on('DOMMouseScroll mousewheel', (event) => {
    
    // if in console return
    if(inConsole()) return

    // zoom out
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      let zoomChange = camera.zoom/10
      camera.zoom -= zoomChange

      let c = camera.pos
      let p = zoomChange
      let t = getTileUnderMouse(mouse.pos.x, mouse.pos.y) // tile
      let tcX = t.x-c.x
      let tcY = t.y-c.y
      tcX /= 10
      tcY /= 10
      camera.pos.x -= tcX
      camera.pos.y -= tcY

      debugPanel.add('zoom', camera.zoom)
      debugPanel.add('posX', camera.pos.x)
      debugPanel.add('posY', camera.pos.y)
    }

    // zoom in
    else {
      let zoomChange = camera.zoom/10
      camera.zoom += zoomChange

      let c = camera.pos
      let p = zoomChange
      let t = getTileUnderMouse(mouse.pos.x, mouse.pos.y) // tile
      let tcX = t.x-c.x
      let tcY = t.y-c.y
      tcX /= 10
      tcY /= 10
      camera.pos.x += tcX
      camera.pos.y += tcY


      debugPanel.add('zoom', camera.zoom)
      debugPanel.add('posX', camera.pos.x)
      debugPanel.add('posY', camera.pos.y)
    }
  })
  
  // listen for mouseMove
  $(document).on('mousemove', (event) => {
    mouse.pos.x = event.pageX
    mouse.pos.y = event.pageY

    // dispaly tile under mouse info
    displayTileInfo()
  })
})