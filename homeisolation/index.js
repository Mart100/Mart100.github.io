let canvas, ctx
let houseTemp = 21
let outsideTemp = 5
let speed = 2
let factor = 0.05
let isPaused = true

$(function() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  frame()
  setInterval(() => { tick() }, 10)
})
