let canvas, ctx
let world = []
let keys = {}
let worldSize = 1e3
let totalTilesLoaded = 0
let fps = 0
let loadTilesPerSec = 100000
let camera = {
  pos: {x: 0, y: 0},
  zoom: 50
}
let debugPanel


$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  debugPanel = new DebugPanel()
  debugPanel.textColor('#FFFFFF')

  // calling some funcitons
  frame()
  setInterval(() => { tick() }, 10)

})

// update debugPanel per Sec
setInterval(() => {

  // FPS
  debugPanel.add('FPS', fps)
  fps = 0

  // total Tiles
  debugPanel.add('Tiles', totalTilesLoaded)

}, 1000)


function cap(val, min=0, max=1) {
  if(val > max) val = max
  if(val < min) val = min
  return val
}