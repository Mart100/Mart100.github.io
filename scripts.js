$(document).ready(function(){
  $('.WhiteBOX').hover(function() {
    $(this).css('opacity', '1')
    $(this).css('cursor', 'pointer')
    $(this).css('width', '320')
    $(this).css('height', '370')
  }, function() {
    $(this).css('opacity', '0.7')
    $(this).css('width', '300')
    $(this).css('height', '350')
  })
})
