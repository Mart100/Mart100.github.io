let canvas
let ctx


$(function() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  // Set Canvas size
  canvas.width = 1400
  canvas.height = 900

  draw()
})


function draw() {

  window.requestAnimationFrame(draw)

  let side1 = game.side1, side2 = game.side2
  let ball = game.ball
  ctx.fillStyle = '#FFF'
  ctx.strokeStyle = 'white'

  // clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw paddle1
  ctx.beginPath()
  ctx.rect(20, side1.y+450-37.5, 8, 75)
  ctx.fill()

  // draw paddle2
  ctx.beginPath()
  ctx.rect(1372, side2.y+450-37.5, 8, 75)
  ctx.fill()

  // draw ball
  ctx.beginPath()
  ctx.arc(ball.pos.x+700, ball.pos.y+450, 10, 0, 2*Math.PI)
  ctx.fill()

  // draw score
  ctx.textAlign='right'
  ctx.fillText(side1.goals, 675, 40)
  ctx.textAlign='left'
  ctx.fillText(side2.goals, 725, 40)

  // draw middle line
  ctx.strokeStyle = 'white'
  ctx.lineWidth=5
  ctx.setLineDash([20, 6])/*dashes are 5px and spaces are 3px*/
  ctx.beginPath()
  ctx.moveTo(700, 0)
  ctx.lineTo(700, 900)
  ctx.stroke()
}
