$(() => {
  $('#options-button').on('click', () => {
    $('#options').show()
    $('#options').animate({height: 59})
  })

  $('#closeOptions-button').on('click', () => {
    $('#options').animate({height: 0}, () => {
      $('#options').hide()
    })
  })

  $('#load-button').on('click', () => {
    showLoadPopup()
  })
})