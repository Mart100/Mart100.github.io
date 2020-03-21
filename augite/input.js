let keys = {}
let mouse = {
  pos: new Vector(0, 0)
}

$(() => {
  $('#canvas').on('click', (event) => {

  })

  // mouse move
  $('#canvas').on('mousemove', (event) => {
    mouse.pos.x = event.clientX
    mouse.pos.y = event.clientY
  })

  // keyboard
  $(document).on('keydown', (event) => { keys[event.keyCode] = true })
  $(document).on('keyup',   (event) => { keys[event.keyCode] = false })

  // listen for zooming
  $('#canvas').on('DOMMouseScroll mousewheel', (event) => {
    // zoom out
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
    } else {
    }
  })
    
  // moving loop
  setInterval(() => {
    moving()
  }, 10)
})

function moving() {
  let moved = false
  let wallTouched = false

  let speed = 5
  let wallSize = player.size+walls[0]

  if(keys[87] || keys[38]) { // north
    if(player.pos.y > 0+wallSize) {
      player.pos.y -= speed
      moved = true
    } else {
      wallTouched = true
    }
  }
  if(keys[68] || keys[39]) { // east
    if(player.pos.x < canvas.width-wallSize) {
      player.pos.x += speed
      moved = true
    } else {
      wallTouched = true
    }
  }
  if(keys[83] || keys[40]) { // south
    if(player.pos.y < canvas.height-wallSize) {
      player.pos.y += speed
      moved = true
    } else {
      wallTouched = true
    }
  }
  if(keys[65] || keys[37]) { // west
    if(player.pos.x > 0+wallSize) {
      player.pos.x -= speed
      moved = true
    } else {
      wallTouched = true
    }
  }

  if(wallTouched) die()
  if(moved) {
  }

}