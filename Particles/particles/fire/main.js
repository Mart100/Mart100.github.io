let canvas, ctx
let mouse = {pos: {x:0,y:0}, down: false, cursor: 'default'}
let settings = {
  show: 'wood', // wood - temperature
  speed: 50,
  detail: 5,
  isPaused: false,
  particles: true
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

// show
coms.addCommand('show', 'string', {options: ['wood', 'temperature', 'durability']}, (string) => {
  settings.show = string
  if(string == 'wood') settings.particles = true
  else settings.particles = false
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

// particles
coms.addCommand('particles', 'boolean', {}, (bool) => {
  settings.particles = bool
  if(bool) return 'Particles Enabled!'
  else return 'Particles Disabled!'
})

// monitor
coms.addCommand('monitor', 'boolean', {}, (bool) => {
  if(bool) $('body').css('background-image', "url('https://i.imgur.com/CMRGrIz.jpg')")
  else $('body').css('background-image', "")
})