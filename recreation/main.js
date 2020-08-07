let canvas, ctx, imgData

$(() => {

	canvas = $('#canvas')[0]
	ctx = canvas.getContext('2d')

	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}) 