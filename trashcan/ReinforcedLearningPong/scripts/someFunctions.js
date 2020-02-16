function randomUnitVector() {
  let x = (Math.random()*2)-1
  let y = (Math.random()*2)-1
  let magnitude = Math.sqrt(x*x + y*y)
  let randomVector = {x: x/magnitude, y: y/magnitude}
  return randomVector  
}

function randomBallVelocity() {
  let velocity = randomUnitVector()
  while(velocity.x > 0.95 || velocity.x < -0.95 || velocity.y > 0.95 || velocity.y < -0.95) velocity = randomUnitVector()
  return velocity
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x))
}

function sigmoid_derivative(x) {
  return x * (1 - x)
}

function info_to_brain_input() {
  
  //Normalize Data
  let ballX = game.ball.pos.x/1400+0.5
  let ballY = game.ball.pos.y/900+0.5
  let paddle1Y = game.side1.y/900+0.5 // own paddle
  let paddle2Y = game.side2.y/900+0.5
  let ballVelocityX = game.ball.velocity.x/2+0.5
  let ballVelocityY = game.ball.velocity.y/2+0.5

  return [ballX, ballY, paddle1Y, paddle2Y, ballVelocityX, ballVelocityY]
}