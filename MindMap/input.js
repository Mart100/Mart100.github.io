let mouseDown = false

$(() => {
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
    mouseDown = true

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
    }

    if(mode == 'pan') {
      modes.pan.previousOffset.x = map.offset.x
      modes.pan.previousOffset.y = map.offset.y

      modes.pan.start.x = event.clientX
      modes.pan.start.y = event.clientY

      $('#canvas').css('cursor', 'grabbing')
    }
  })

  $('#canvas').on('mouseup', () => {
    mouseDown = false

    if(mode == 'pan') {
      $('#canvas').css('cursor', 'grab')
    }
  })

  $('#canvas').on('mousemove', (event) => {
    if(selected.split('-')[0] == 'line') {

      if(!mouseDown) return

      let l = getSelected()

      let mousePos = getMouseVector(event)
      let pos = mousePos.plus(map.offset)

      l.pos2 = pos.clone()
    }

    if(mode == 'pan') {

      if(!mouseDown) return

      map.offset.x = modes.pan.previousOffset.x + (modes.pan.start.x - event.clientX)
      map.offset.y = modes.pan.previousOffset.y + (modes.pan.start.y - event.clientY)
    }
  })

  $(document).on('keydown', (event) => {

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