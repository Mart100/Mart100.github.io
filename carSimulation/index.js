let canvas, ctx
let keys = {}
let mouse = {pos:{x:0,y:0}}
let grid
let debugPanel


$(() => {
  // prepare canvas
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // other
  grid = new Grid(1000, 1000)
  debugPanel = new DebugPanel()

  // call functions
  frame()
  setInterval(() => { tick() }, 10)
})
