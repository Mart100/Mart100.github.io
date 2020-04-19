$(function() {
  let current = 0
  $('body').on('click', () => {
    $('#num').val(current)
    $('#num').select()
    document.execCommand("Copy")
    current++
  })
})
