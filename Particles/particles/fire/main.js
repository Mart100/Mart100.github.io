let canvas, ctx
let mouse = {pos: {x:0,y:0}, down: false, cursor: 'default'}
let settings = {
  show: 'wood', // wood - temperature
  speed: 100,
  detail: 5,
  isPaused: false
}
let coms = new ComsConsole()
let grid
let debugPanel
let particles = []
let seed = Math.random()

$(() => {
  // prepare canvas
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // some functions
  debugPanel = new DebugPanel()
  grid = new Grid(window.innerWidth/settings.detail, window.innerHeight/settings.detail)
  debugPanel.textColor('#FFFFFF')
  frame()
  setInterval(tick, 1)
})

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// console commands

// show
coms.addCommand('show', 'string', {options: ['wood', 'temperature', 'durability']}, (string) => {
  settings.show = string
  grid.completeImgDataCalc()
  return 'Now showing: '+string
})

// reset
coms.addCommand('reset', 'none', {}, () => {
  grid.createGrid()
  return 'Resetted Grid!'
})

// speed
coms.addCommand('speed', 'number', {}, (num) => {
  settings.speed = num
  return 'Speed set to: '+num
})

// detail
coms.addCommand('detail', 'number', {}, (num) => {
  settings.detail = num
  grid = new Grid(window.innerWidth/settings.detail, window.innerHeight/settings.detail)
  return 'Detail set to: '+num
})

// pause
coms.addCommand('pause', 'none', {}, () => {
  let to = !settings.isPaused
  settings.isPaused = to
  if(to) return 'Paused!'
  else return 'Unpaused!'
})