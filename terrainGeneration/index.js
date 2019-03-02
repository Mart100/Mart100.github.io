let canvas, ctx
let world = []
let keys = {}
let worldSize = 1e3
let seed = 0.27573
let loadTilesPerSec = 5000
let camera = {
  pos: {x: 0, y: 0},
  zoom: 50
}


$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // calling some funcitons
  createWorld()
  frame()
  setInterval(() => { tick() }, 10)

})