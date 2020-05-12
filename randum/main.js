$(() => {

	let scrolled = $(window).scrollTop()
	$('.parallax').each(function(index) {
			let imageSrc = $(this).data('image-src')
			let imageHeight = $(this).data('height')
			$(this).css('background-image','url(' + imageSrc + ')')
			$(this).css('height', imageHeight)

			let initY = $(this).offset().top
			let height = $(this).height()
			let diff = scrolled - initY
			let ratio = Math.round((diff / height) * 100)
			$(this).css('background-position','center ' + parseInt(-(ratio * 1.5)) + 'px')
	})
	
	$(window).scroll(() => {
		let scrolled = $(window).scrollTop()
		$('.parallax').each(function(index, element) {
			let initY = $(this).offset().top
			let height = $(this).height()
			let endY  = initY + $(this).height()

			let diff = scrolled - initY
			let ratio = Math.round((diff / height) * 100)
			$(this).css('background-position','center ' + parseInt(-(ratio * 1.5)) + 'px')
		})
	})
})