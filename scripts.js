$(document).ready(function(){
  $('.WhiteBOX').hover(function() {
    $(this).css('opacity', '1')
    $(this).css('cursor', 'pointer')
    $(this).css('width', '350')
    $(this).css('height', '450')
  }, function() {
    $(this).css('opacity', '0.7')
    $(this).css('width', '300')
    $(this).css('height', '400')
  })
})
