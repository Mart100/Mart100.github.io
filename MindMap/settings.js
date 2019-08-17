function showSettings(type) {

  $('.setting').hide()

  if(type == 'none') return

  switch(type) {
    case('text'): {
      $('#setting-font_size').fadeIn()
      $('#setting-delete').fadeIn()
      $('#setting-color').fadeIn()
      break
    }

    case('line'): {
      $('#setting-delete').fadeIn()
      $('#setting-color').fadeIn()
      break
    }

    case('shape'): {
      $('#setting-delete').fadeIn()
      $('#setting-color').fadeIn()
      $('#setting-shape').fadeIn()
      break
    }
  }
}

function settingChanges() {
  $('#setting-font_size input').on('input', () => {
    let selected = getSelected()
    selected.size = Number($('#setting-font_size input').val())
  })

  $('#setting-delete').on('click', () => {
    let selectedE = getSelected()
    let selectedType = getSelectedType()

    if(selectedType == 'text') map.texts.splice(map.texts.indexOf(selectedE), 1)
    if(selectedType == 'line') map.lines.splice(map.lines.indexOf(selectedE), 1)
    if(selectedType == 'shape') map.shapes.splice(map.shapes.indexOf(selectedE), 1)

    selected = 'none'
    showSettings('none')
  })

  $('#setting-color input').on('change', () => {
    let color = $('#setting-color input').val()
    let selectedE = getSelected()
    selectedE.color = color
  })

  $('#setting-shape .dropright-button').on('click', () => {
    $('#setting-shape .dropright').fadeIn()

    $('#setting-shape .dropright div').off().on('click', (event) => {
      $('#setting-shape .dropright div').off()
      $('#setting-shape .dropright').fadeOut()
      let chosen = event.target.id.replace('shape-setting-', '')

      $('#setting-shape .dropright-button').html(chosen)

      modes.shape.type = chosen

      let selectedE = getSelected()
      selectedE.type = chosen
    })
  })
}