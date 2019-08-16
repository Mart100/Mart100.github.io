function showSettings(type) {

  $('.setting').fadeOut()

  if(type == 'none') return

  switch(type) {
    case('text'): {

      $('#setting-font_size').fadeIn()
      $('#setting-delete').fadeIn()

    }

    case('line'): {

      $('#setting-delete').fadeIn()

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

    selected = 'none'
    showSettings('none')
  })
}