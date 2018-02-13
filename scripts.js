$(document).ready(function(){
  $('.WhiteBOX').hover(function() {
    $(this).css('width', '320')
    $(this).css('height', '370')
    $(this).css('border_radius', '0')
  }, function() {
    $(this).css('width', '300')
    $(this).css('height', '350')
    $(this).css('border_radius', '10')
  })
})
