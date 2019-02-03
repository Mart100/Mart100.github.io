let canvas, ctx
let objects = []


$(function() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  frame()
  setInterval(() => { tick() }, 10)
  createWorld()
})

// create random world

