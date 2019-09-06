$(() => {
  var $root = $('html, body')

  $('a[href^="#"]').click((event) => {
    let href = $($(event.target).attr('href'))
    $('body').animate({scrollTop: $(href).offset().top}, 500, () => window.location.hash = $(event.target).attr('href'))
    return false
  })
})