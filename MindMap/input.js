let mouseDown = false
let rightMouseDown = false
let mousePos = new Vector(0, 0)

$(() => {

  // disable right click
  document.addEventListener('contextmenu', event => event.preventDefault());
  
  $('#canvas').on('click', (event) => {

    if(mode == 'text') {
      if(modes.text.dragging) return

      let pos = mousePos.plus(map.offset)
      let newText = new Text(pos)
      selected = `text-${newText.id}`

    }

    if(mode == 'selector') select(event.clientX, event.clientY)
  })

  $('#canvas').on('mousedown', (event) => {
    
    if(event.which == 1) mouseDown = true
    if(event.which == 3) rightMouseDown = true

    if(mode == 'line') {

      let mousePos = getMouseVector(event)
      let pos = mousePos.plus(map.offset)

      let newLine = new Line(pos, pos)

      selected = `line-${newLine.id}`

      modes.line.dragging = 2
    }

    if(mode == 'pan' || rightMouseDown) {
      modes.pan.previousOffset.x = map.offset.x
      modes.pan.previousOffset.y = map.offset.y

      modes.pan.start.x = event.clientX
      modes.pan.start.y = event.clientY

      $('#canvas').css('cursor', 'grabbing')
    }
  })

  $('#canvas').on('mouseup', () => {

    let selectedType = getSelectedType()

    if(mode == 'pan' || rightMouseDown) {
      setMode(mode)
    }

    if(selectedType == 'line') {
      modes.line.dragging = 0
    }

    if(selectedType == 'text') {
      if(modes.text.dragging) {
        setTimeout(() => {
          modes.text.dragging = false
          $('#canvas').css('cursor', 'text')
        }, 10)
      }
    }

    if(event.which == 1) mouseDown = false
    if(event.which == 3) rightMouseDown = false
  })

  $('#canvas').on('mousemove', (event) => {

    mousePos.x = event.clientX
    mousePos.y = event.clientY

    let selectedType = getSelectedType()

    if(mode == 'pan' || rightMouseDown) {

      if(mouseDown || rightMouseDown) {  
        map.offset.x = modes.pan.previousOffset.x + (modes.pan.start.x - mousePos.x)
        map.offset.y = modes.pan.previousOffset.y + (modes.pan.start.y - mousePos.y)
      }
    }

    if(selectedType == 'line') {

      let l = getSelected()

      let mouseMapPos = mousePos.plus(map.offset)

      let disPos1 = l.pos1.clone().minus(mouseMapPos).getMagnitude()
      let disPos2 = l.pos2.clone().minus(mouseMapPos).getMagnitude()

      if(mouseDown && disPos1 < 10) modes.line.dragging = 1
      if(mouseDown && disPos2 < 10) modes.line.dragging = 2
      
      
      if(modes.line.dragging == 1) l.pos1 = mouseMapPos.clone()
      if(modes.line.dragging == 2) l.pos2 = mouseMapPos.clone()

    }

    if(selectedType == 'text') {
      
      let t = getSelected()

      let mouseMapPos = mousePos.clone().plus(map.offset)

      if(mouseMapPos.x < t.position.x+7 &&
         mouseMapPos.x > t.position.x-7 &&
         mouseMapPos.y < t.position.y-16 && 
         mouseMapPos.y > t.position.y-30) {
          if(mouseDown) modes.text.dragging = true

          $('#canvas').css('cursor', 'pointer')
        }
      else if($('#canvas').css('cursor') == 'pointer') $('#canvas').css('cursor', 'text')

      if(modes.text.dragging) {
        $('#canvas').css('cursor', 'pointer')
        let offset = new Vector(0, -23)
        console.log(offset)

        t.position.x = mouseMapPos.x-offset.x
        t.position.y = mouseMapPos.y-offset.y
      }
    }
  })

  $(document).on('keydown', (event) => {

    // stop going to previous page when backspace
    if(event.keyCode == 8) event.preventDefault()

    if(selected == 'none') return

    if(selected.split('-')[0] == 'text') {
      let t = getSelected()

      if(event.key == 'Backspace') return t.text = t.text.slice(0, -1)
      if(event.key == 'Enter') return selected = 'none'
      if(event.key == 'CapsLock') return
      if(event.key == 'Shift') return
      if(event.key == 'Alt') return
      if(event.key == 'Control') return
      if(event.key == 'OS') return
      if(event.key == 'Tab') return

      modes.text.lastCursorMove = Date.now()

      if(event.key == 'ArrowLeft') {
        if(t.cursorPosition > 0) t.cursorPosition -= 1
        return
      }

      if(event.key == 'ArrowRight') {
        if(t.cursorPosition < t.text.length) t.cursorPosition += 1
        return
      }

      if(t.cursorPosition == t.text.length) {
        t.cursorPosition = t.text.length+1
        t.text += event.key
      }
      else {
        let newText = t.text
        newText = newText.split('')
        newText.splice(t.cursorPosition, 0, event.key)
        newText = newText.join('')
        t.text = newText
        t.cursorPosition += 1
      }
      
    }

  })
})