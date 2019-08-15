let mouseDown = false
let rightMouseDown = false
let mousePos = new Vector(0, 0)

$(() => {

  // disable right click
  document.addEventListener('contextmenu', event => event.preventDefault());
  
  $('#canvas').on('click', (event) => {

    if(mode == 'text') {

      let id = randomToken(10)
      selected = `text-${id}`

      let mousePos = getMouseVector(event)
      let pos = mousePos.plus(map.offset)

      map.texts.push({
        text: '',
        id: id,
        size: 25,
        position: pos.clone()
      })
    }

    if(mode == 'selector') select(event.clientX, event.clientY)
  })

  $('#canvas').on('mousedown', (event) => {
    
    if(event.which == 1) mouseDown = true
    if(event.which == 3) rightMouseDown = true

    if(mode == 'line') {
      let id = randomToken(10)
      selected = `line-${id}`

      let mousePos = getMouseVector(event)
      let pos = mousePos.plus(map.offset)

      map.lines.push({
        pos1: pos.clone(),
        pos2: pos.clone(),
        id: id
      })

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

    if(event.which == 1) mouseDown = false
    if(event.which == 3) rightMouseDown = false
  })

  $('#canvas').on('mousemove', (event) => {

    mousePos.x = event.clientX
    mousePos.y = event.clientY

    if(mode == 'pan' || rightMouseDown) {

      if(!mouseDown && !rightMouseDown) return

      map.offset.x = modes.pan.previousOffset.x + (modes.pan.start.x - mousePos.x)
      map.offset.y = modes.pan.previousOffset.y + (modes.pan.start.y - mousePos.y)
    }

    if(selected.split('-')[0] == 'line') {

      let l = getSelected()

      let mouseMapPos = mousePos.plus(map.offset)

      let disPos1 = l.pos1.clone().minus(mouseMapPos).getMagnitude()
      let disPos2 = l.pos2.clone().minus(mouseMapPos).getMagnitude()

      if(mouseDown && disPos1 < 10) modes.line.dragging = 1
      if(mouseDown && disPos2 < 10) modes.line.dragging = 2
      
      
      if(modes.line.dragging == 1) l.pos1 = mouseMapPos.clone()
      if(modes.line.dragging == 2) l.pos2 = mouseMapPos.clone()

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
      
      t.text += event.key
    }

  })
})