function draw() {
  // clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for(let index in balls) {
    let ball = balls[index]
    ctx.beginPath()
    ctx.fillStyle = ball.color
    ctx.arc(ball.x, ball.y, ball.mass,0,2*Math.PI)
    ctx.fill()
  }
  
}