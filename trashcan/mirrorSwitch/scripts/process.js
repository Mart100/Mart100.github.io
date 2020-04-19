function tick() {

  if(inMenu) return


  length += ball.speed

  ball.speed += 0.005

  $('#score').html(Math.round(length/50))

  if(Math.random() > 0.8) createBallSpeedParticle()

  for(let p of particles) p.tick()

  // add walls
  let lastWall = Object.keys(path).sort().pop() - length
  if(isNaN(lastWall)) lastWall = 0
  if(Math.random() > lastWall/500) addWall()

  ifHitWall()

}

function createBallSpeedParticle() {
  let ballPos = getBallPos()
  let pPosX = randomRange(ballPos.x-20, ballPos.x+20)
  pPosX = Math.round(pPosX)
  let pPosY = randomRange(ballPos.y-10, ballPos.y+10)-50
  let pSettings = {
    position: new Vec2(pPosX, pPosY),
    color: [255, 255, 255, 1],
    size: new Vec2(0, randomRange(5, 25)),
    fadeAway: randomRange(100, 800),
    velocity: new Vec2(0, randomRange(-1, -5))
  }
  particles.push(new Particle(pSettings))
}

function ifHitWall() {
  for(let p in path) {
    if(Math.abs(length-p) < 38 && ball.side == path[p].side) died()
  }
}