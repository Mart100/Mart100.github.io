let canvas, ctx
let ball = {
  side: 'right',
  speed: 1
}
let inMenu = true
let particles = []
let path = {

}
let length = 0


$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  frame()
  setInterval(() => { tick() }, 10)
})

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getBallPos() {
  // X
  let ballX
  if(ball.side == 'right') ballX = canvas.width/2 + 35
  if(ball.side == 'left') ballX = canvas.width/2 - 35

  return new Vec2(ballX, canvas.height/2)

}

function died() {
  inMenu = true
  $('#play').fadeIn(500)
}

function play() {
  length = 0
  path = {}
  ball.speed = 1
  ball.side = Math.random() ? 'right' : 'left'
  $('#play').fadeOut(500)

  setTimeout(() => {
    inMenu = false
    
  }, 500)
}