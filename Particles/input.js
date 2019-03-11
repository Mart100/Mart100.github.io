
function mouseEventsListener() {
  // mouse move
  $(document).on('mousemove', (event) => {
    mouse.pos.x = event.clientX
    mouse.pos.y = event.clientY
  })

  // mouse down
  $(document).on('mousedown', () => {
    mouse.down = true
    onMouseDown()
  })

  // mouse up
  $(document).on('mouseup', () => {
    mouse.down = false
  })
}

function onMouseDown() {

  // if mouse clicked button
  for(let buttonName in buttons) {
  
    // some vars
    let button = buttons[buttonName]
    let width = button.width
    let height = button.height
    let x = button.x
    let y = button.y


    // if mouse over button
    if(mouse.pos.x > x && mouse.pos.x < x+width && mouse.pos.y > y && mouse.pos.y < y+height) {
      button.clicked()
    }
  }
}

function setMouseCursor(a) {
  if(mouse.cursor == a) return
  else {
    $('body').css('cursor', a)
    mouse.cursor = a
  }
}