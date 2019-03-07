let canvas, ctx
let world = []
let keys = {}
let mouse = {
  pos: {},
  down: false
}
let worldSize = 1e3
let totalTilesLoaded = 0
let fps = 0
let loadTilesPerSec = 10000
let time = 43200
let camera = {
  pos: {x: 1, y: 1},
  zoom: 0.01,
  speed: 2
}
let settings = {
  pixelated: true,
  detail: 5,
  drawSkips: {
    enabled: true,
    strength: 5,
    view: false
  },
  timeSpeed: 50,
  timeEnabled: true

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
  setTimeout(() => {
    frame()
    setInterval(() => { tick() }, 10)
  }, 1000)

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