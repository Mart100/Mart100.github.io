let canvas, ctx
let width, height
let world


$(() => {
  canvas = document.getElementById('core-canvas')
  ctx = canvas.getContext('2d')

  width = window.innerWidth
  height = window.innerHeight

  canvas.width = width
  canvas.height = height

  world = new World()

  frame()
  setInterval(() => { tick() }, 10)
})
