let mouseDown = false
let rightMouseDown = false
let viewMode = false
let mousePos = new Vector(0, 0)

$(() => {

  // disable right click
  document.addEventListener('contextmenu', event => {

    if(event.target.id == 'ctx-image') return
    
    event.preventDefault()
    
  })
  
  $('#canvas').on('click', (event) => {

    if(mode == 'text') {
      if(modes.text.dragging) return

      let pos = mousePos.plus(map.offset)
      let newText = new Text(pos)

      newText.size = Number($('#setting-font_size input').val())
      selected = `text-${newText.id}`

      saveHistory(getSelected())

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

      saveHistory(getSelected())

      modes.line.dragging = 2
    }

    if(mode == 'shape') {

      let mousePos = getMouseVector(event)
      let pos = mousePos.plus(map.offset)

      let newShape = new Shape(pos, pos)

      selected = `shape-${newShape.id}`

      saveHistory(getSelected())

      modes.shape.dragging = 2
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
    let element = getSelected()

    if(mode == 'pan' || rightMouseDown) {
      setMode(mode)
    }

    if(selectedType == 'line') {
      modes.line.dragging = 0
    }

    if(selectedType == 'shape') {
      modes.shape.dragging = 0
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

  $(document).on('mousemove', (event) => {

    mousePos.x = event.clientX
    mousePos.y = event.clientY

    if(mousePos.x < 200) return

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

      if(mouseDown && disPos1 < 10 && modes.line.dragging == 0) { modes.line.dragging = 1; saveHistory(l) }
      if(mouseDown && disPos2 < 10 && modes.line.dragging == 0) { modes.line.dragging = 2; saveHistory(l) }

      if(disPos1 < 10 || disPos2 < 10) $('#canvas').css('cursor', 'pointer')
      else $('#canvas').css('cursor', 'default')
      
      if(modes.line.dragging == 1) l.pos1 = mouseMapPos.clone()
      if(modes.line.dragging == 2) l.pos2 = mouseMapPos.clone()

    }

    if(selectedType == 'shape') {

      let s = getSelected()

      let mouseMapPos = mousePos.plus(map.offset)

      let disPos1 = s.pos1.clone().minus(mouseMapPos).getMagnitude()
      let disPos2 = new Vector(s.pos2.x, s.pos1.y).minus(mouseMapPos).getMagnitude()
      let disPos3 = s.pos2.clone().minus(mouseMapPos).getMagnitude()
      let disPos4 = new Vector(s.pos1.x, s.pos2.y).minus(mouseMapPos).getMagnitude()

      if(mouseDown && disPos1 < 10 && modes.shape.dragging == 0) { modes.shape.dragging = 1; saveHistory(s) }
      if(mouseDown && disPos2 < 10 && modes.shape.dragging == 0) { modes.shape.dragging = 2; saveHistory(s) }
      if(mouseDown && disPos3 < 10 && modes.shape.dragging == 0) { modes.shape.dragging = 3; saveHistory(s) }
      if(mouseDown && disPos4 < 10 && modes.shape.dragging == 0) { modes.shape.dragging = 4; saveHistory(s) }

      if(disPos1 < 10 || disPos2 < 10 || disPos3 < 10 || disPos4 < 10) $('#canvas').css('cursor', 'pointer')
      else $('#canvas').css('cursor', 'default')
      
      if(modes.shape.dragging == 1) s.pos1 = mouseMapPos.clone()
      if(modes.shape.dragging == 2) {
        s.pos2.x = mousePos.x
        s.pos1.y = mousePos.y
      }
      if(modes.shape.dragging == 3) s.pos2 = mouseMapPos.clone()
      if(modes.shape.dragging == 4) {
        s.pos2.y = mousePos.y
        s.pos1.x = mousePos.x 
      }

    }

    if(selectedType == 'text') {
      
      let t = getSelected()

      let mouseMapPos = mousePos.clone().plus(map.offset)

      if(mouseMapPos.x < t.position.x+7 &&
         mouseMapPos.x > t.position.x-7 &&
         mouseMapPos.y < t.position.y-16 && 
         mouseMapPos.y > t.position.y-30) {
          if(mouseDown && !modes.text.dragging) {
            modes.text.dragging = true
            saveHistory(t)
          }

          $('#canvas').css('cursor', 'pointer')
        }
      else if($('#canvas').css('cursor') == 'pointer') $('#canvas').css('cursor', 'text')

      if(modes.text.dragging) {
        $('#canvas').css('cursor', 'pointer')
        let offset = new Vector(0, -23)

        t.position.x = mouseMapPos.x-offset.x
        t.position.y = mouseMapPos.y-offset.y
      }
    }
  })

  $(document).on('keydown', (event) => {

    // ctrl z
    if(event.keyCode == 90 && event.ctrlKey) {
      let lastSave = history.pop()
      if(lastSave == undefined) return

      selected = lastSave.what+'-'+lastSave.id
      let element = getSelected()
      element.import(lastSave)

      return

    }

    // delete
    if(event.key == 'Delete' || event.key == 'Backspace') {
      saveHistory(getSelected())
      $('#setting-delete').click()
    }

    if(mousePos.x < 200) return

    if($('input').is(':focus')) {
      if(event.key == 'Enter') $('input').blur()
      return
    }

    // stop going to previous page when backspace
    if(event.keyCode == 8) event.preventDefault()

    if(selected == 'none') return

    if(selected.split('-')[0] == 'text') {
      let t = getSelected()

      if(event.key == 'Backspace') {
        let newText = t.text.split('')
        newText.splice(t.cursorPosition-1, 1)
        t.text = newText.join('')
        t.cursorPosition -= 1
        return
      }

      if(event.key == 'Enter') return selected = 'none'

      if(event.key == 'ArrowLeft') {
        if(t.cursorPosition > 0) t.cursorPosition -= 1
        modes.text.lastCursorMove = Date.now()
        return
      }

      if(event.key == 'ArrowRight') {
        if(t.cursorPosition < t.text.length) t.cursorPosition += 1
        modes.text.lastCursorMove = Date.now()
        return
      }

      if(event.key.length > 1) return

      modes.text.lastCursorMove = Date.now()

      if(t.cursorPosition >= t.text.length) {
        t.cursorPosition = t.text.length+1
        t.text += event.key
      }
      else {
        let newText = t.text.split('')
        newText.splice(t.cursorPosition, 0, event.key)
        t.text = newText.join('')
        t.cursorPosition += 1
      }
      
    }

  })

  // listen for zooming
  $('#canvas').on('DOMMouseScroll mousewheel', (event) => {

    if(!viewMode) return

    // zoom out
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      let zoomChange = map.zoom / 10
      map.zoom -= zoomChange
      ctx.scale(1-zoomChange, 1-zoomChange)

    }

    // zoom in
    else {
      let zoomChange = map.zoom / 10
      map.zoom += zoomChange
      ctx.scale(zoomChange+1, zoomChange+1)

    }
  })
})