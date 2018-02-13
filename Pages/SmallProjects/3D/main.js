$(function() {
  let UpdateRotateY
  $(document).on('mousedown', function(event) {
    let currentX = event.clientX
    let currentY = event.clientY
    console.log('down')
    $(document).on('mousemove', function(event) {
      let transforms = $('#cube').css('transform').split(' ')
      let differenceX = event.clientX - currentX
      let differenceY = event.clientY - currentY
      $('#cube').css('transform', `rotateY(${differenceX}deg) rotateX(${-differenceY}deg)`)
    })
  })
  $(document).on('mouseup', function() {
    console.log($('#cube').css('transform'))
    $(document).off('mousemove')
  })

})
