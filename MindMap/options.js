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

  $('#exportImage-button').on('click', () => {
    var img = document.createElement("img")
    img.src = canvas.toDataURL("image/png")
    img.id = 'ctx-image'
    createPopup(img)
    $('#popup').css('background-color', 'rgb(150, 150, 150')
    $('#popup').prepend('<span>Right click the image. And click "Save Image"</span>')
  })
})