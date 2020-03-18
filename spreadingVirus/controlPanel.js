$(() => {
  $('#controlPanel div .title').on('click', (event) => {
    let id = $(event.target).parent().attr('id')
    let elem = $(event.target).parent()

    $('#controlPanel div .content').hide()
    elem.find('.content').show()
  })
})