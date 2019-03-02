$(() => {
  // listen for keys up and down
  $(document).on('keydown', (event) => { keys[event.keyCode] = true  })
  $(document).on('keyup',   (event) => { keys[event.keyCode] = false })

  // listen for zooming
  $(document).on('DOMMouseScroll mousewheel', (event) => {
    // zoom in
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      camera.zoom -= camera.zoom/10
    }
    // zoom out
    else {
      camera.zoom += camera.zoom/10
    }
  })
})