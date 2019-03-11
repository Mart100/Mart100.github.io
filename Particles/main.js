let canvas, ctx
let mouse = {pos: {x:0,y:0}, down: false, cursor: 'default'}
let particles = []
let Psettings = {
  gravity: new Vec2(0, 0)
}
let isPaused = true


$(() => {
  // prepare canvas
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // some functions
  calculateButtonsLocation()
  mouseEventsListener()
  frame()
  setInterval(tick, 10)
})
