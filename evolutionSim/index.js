let canvas, ctx


$(function() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  frame()
  setInterval(() => { tick() }, 10)
})


function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomRGB() {
	return `rgb(${randomRange(0, 255)}, ${randomRange(0, 255)}, ${randomRange(0, 255)})`
}