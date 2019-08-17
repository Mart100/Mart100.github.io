function createPopup(html) {
  $('body').append('<div id="popup"></div>')
  $('body').append('<div id="popup-background"></div>')
  $('#popup').html(html)

  $('#popup-background').on('click', () => {
    deletePopup()
  })
}

function deletePopup() {
  $('#popup').remove()
  $('#popup-background').remove()
}