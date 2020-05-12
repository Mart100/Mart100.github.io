$(() => {

  // Populate images from data attributes.
  let scrolled = $(window).scrollTop()
  $('.parallax').each(function(index) {
      let imageSrc = $(this).data('image-src')
      let imageHeight = $(this).data('height')
      $(this).css('background-image','url(' + imageSrc + ')')
      $(this).css('height', imageHeight)

      // Adjust the background position.
      let initY = $(this).offset().top
      let height = $(this).height()
      let diff = scrolled - initY
      let ratio = Math.round((diff / height) * 100)
      $(this).css('background-position','center ' + parseInt(-(ratio * 1.5)) + 'px')
  })

  // Attach scroll event to window. Calculate the scroll ratio of each element
  // and change the image position with that ratio.
  // https://codepen.io/lemagus/pen/RWxEYz
  $(window).scroll(function() {
    let scrolled = $(window).scrollTop()
    $('.parallax').each(function(index, element) {
      let initY = $(this).offset().top
      let height = $(this).height()
      let endY  = initY + $(this).height()

      // Check if the element is in the viewport.
      let visible = isInViewport(this)
      if(visible) {
        let diff = scrolled - initY
        let ratio = Math.round((diff / height) * 100)
        $(this).css('background-position','center ' + parseInt(-(ratio * 1.5)) + 'px')
      }
    })
  })
})

// Check if the element is in the viewport.
// http://www.hnldesign.nl/work/code/check-if-element-is-visible/
function isInViewport(node) {
  // Am I visible? Height and Width are not explicitly necessary in visibility
  // detection, the bottom, right, top and left are the essential checks. If an
  // image is 0x0, it is technically not visible, so it should not be marked as
  // such. That is why either width or height have to be > 0.
  let rect = node.getBoundingClientRect()
  return (
    (rect.height > 0 || rect.width > 0) &&
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  )
}