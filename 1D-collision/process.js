function tick() {
  if(isPaused) return

  // add speed
  blocks[0].x += blocks[0].speed*10
  blocks[1].x += blocks[1].speed*10

  // set new blocks x
  $('#block0').css('transform', `translateY(-50%) translateX(${-50+blocks[0].x}%)`)
  $('#block1').css('transform', `translateY(-50%) translateX(${-50+blocks[1].x}%)`)

  // check for collision
  if(blocks[0].x+100 > blocks[1].x) {
    collisionCount++
    let NEWblock0SPEED = (blocks[0].speed * (blocks[0].mass - blocks[1].mass) + 2 * (blocks[1].mass * blocks[1].speed)) / (blocks[0].mass + blocks[1].mass)
    let NEWblock1SPEED = (blocks[1].speed * (blocks[1].mass - blocks[0].mass) + 2 * (blocks[0].mass * blocks[0].speed)) / (blocks[0].mass + blocks[1].mass)
    blocks[0].speed = NEWblock0SPEED
    blocks[1].speed = NEWblock1SPEED
  }

  // check for walls                          
  if(blocks[0].x < -450 && settings.walls.left) {
    blocks[0].speed = -blocks[0].speed
    collisionCount++
  }
  if(blocks[1].x > 450 && settings.walls.right) {
    blocks[1].speed = -blocks[1].speed
    collisionCount++
  }
}
