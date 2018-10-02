let c,ctx
let numberOfBalls = 50
let speed = {min: -2, max: 2}
let processspeed = 10
var balls = []
var mass = {min: 50, max: 150}
let IntervalDRAW, IntervalPROCESS
$(function () {
  canvas = document.getElementById("canvas")
  ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  
  // create balls
  for(let i = 0; i < numberOfBalls; i++) {
    let newBall = {}
    let totalHits = 0
    do {
      // create new ball
      newBall = createNewBall()
      totalHits = 0
      // check if newBall is not hitting any existing balls
      
      for(let ballID in balls) {
        let currentCheckBall = balls[ballID]
        let dx = newBall.x - currentCheckBall.x
        let dy = newBall.y - currentCheckBall.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        // if hitting
        if(distance < newBall.mass+currentCheckBall.mass) totalHits++
      }
    } while (totalHits > 0)
    // when finnaly ready. Create ball
    balls.push(new Ball(newBall.x, newBall.y, newBall.mass, newBall.velocity, newBall.color))
  }

  IntervalDRAW = setInterval(draw, 1000/60)
  IntervalPROCESS = setInterval(process, processspeed)
})
function createNewBall() {
  return { x: random(0, canvas.width), // random x
           y: random(0, canvas.height), // random y
           mass: random(mass.min, mass.max),  // random mass
           velocity: { x: random(speed.min, speed.max), y: random(speed.min, speed.max)}, // random velocity
           color: `rgb(${random(10, 255)}, ${random(10, 255)}, ${random(10, 255)})` // random color
         }
}