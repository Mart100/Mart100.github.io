let currentCategory = 'all'

$(() => {
	parallaxEffect()
	addCommands()
})

function addCommands() {
	let categories = {
		all: 'white',
		admin: 'red',
		text: 'blue',
		other: 'yellow',
		images: 'green',
		links: 'lightskyblue',
		general: 'purple'
	}

	$('#commands table').html(`
<tr>
	<th></th>
	<th>Command</th>
	<th>Description</th>
	<th>Source</th>
</tr>
	`)
	
	// add commands to commandList
	for(let commandName in commandList) {
		let command = commandList[commandName]

		if(command.category == 'hidden') continue
		if(command.disabled) continue
		
		if(command.category != currentCategory && currentCategory != 'all') continue
		
		let color = categories[command.category]

		$('#commands table').append(`
<tr>
	<td class="category ${command.category}"><div></div></td>
	<td>randum ${commandName}</td>
	<td>${command.description}</td>
	<td>${command.source}</td>
</tr>
		`)

		$(`.category.${command.category} div`).css('background-color', color)
	}

	// add categories

	$('#categories').html('')
	for(let category in categories) {
		let color = categories[category]
		$('#categories').append(`<div class="categoryButton ${category}" id="catBut-${category}"><span>${category}</span><div class="background"></div></div>`)
		$(`.categoryButton.${category}`).css('border', `2px solid ${color}`)
		$(`.categoryButton.${category} .background`).css('background-color', `${color}`)
		if(category == currentCategory) $(`.categoryButton.${category}`).addClass('selected')
		$(`.categoryButton.${category}`).on('click', (event) => {
			let target = $(event.target)
			$('#categories .categoryButton').removeClass('selected')
			target.addClass('selected')
			let id = target.attr('id')
			let cat = id.split('-')[1]
			currentCategory = cat
			addCommands()
		})
	}
}

function parallaxEffect() {

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
}