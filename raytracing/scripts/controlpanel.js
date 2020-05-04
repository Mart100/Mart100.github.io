$(() => {
	$('#controlpanel .button').on('click', (event) => {
		let elem = $(event.target)
		if(elem.hasClass("toggle")) {
			let toggled = elem.hasClass("toggled")
			
			if(elem.hasClass("views")) {
				console.log('yes')
				$('#controlpanel .button.views').removeClass("toggled")
				elem.toggleClass("toggled")
				if(elem.hasClass('topdown')) {
					renderer.changeView('topdown')
				}
				if(elem.hasClass('sideview')) {
					renderer.changeView('sideview')
				}
				if(elem.hasClass('raytracing')) {
					renderer.changeView('raytracing')
				}
			}

		}
		else {
			
			if(elem.hasClass("addcube")) world.addCube()
			if(elem.hasClass("addball")) world.addBall()
			if(elem.hasClass("addlight")) world.addLight()
		}
	})
})
