let canvas, ctx
let mouse = {pos: {x:0,y:0}, down: false, cursor: 'default'}
let rockets = []
let rocketImage = new Image()
rocketImage.src = './Rocket.png'

$(() => {
  // prepare canvas
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // some functions
  frame()
  setInterval(tick, 10)
})

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}