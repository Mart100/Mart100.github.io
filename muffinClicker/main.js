let muffincount = 0

$(() => {
  $('#muffin').on('click', () => {
    muffincount++
    $('#muffinCount').html(`Leksi has ${muffincount} muffins`)
  })
})