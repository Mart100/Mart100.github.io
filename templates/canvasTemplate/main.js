let canvas, ctx


$(function() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  setInterval(() => { frame() }, 1000/60)
  setInterval(() => { tick() }, 10)
})
