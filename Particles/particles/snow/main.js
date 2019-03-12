let canvas, ctx
let mouse = {pos: {x:0,y:0}, down: false, cursor: 'default'}
let settings = {
  speed: 2,
  isPaused: false,
  amount: 1000
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
  grid = new Grid(window.innerWidth, window.innerHeight)
  debugPanel.textColor('#FFFFFF')
  frame()
  setInterval(tick, 10)

  // other things
  setInterval(() => {
    debugPanel.add('Particles', particles.length)
  }, 100)
})

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// console commands

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

// pause
coms.addCommand('pause', 'none', {}, () => {
  let to = !settings.isPaused
  settings.isPaused = to
  if(to) return 'Paused!'
  else return 'Unpaused!'
})
