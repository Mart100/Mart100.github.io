function tick() {
  for(let b of boxes) {

    let BaP = b.position
    
    // move with velocity
    BaP.x += b.velocity.x
    BaP.y += b.velocity.y

    // bounce off walls
    if(BaP.x < 0) b.velocity.x *= -1
    if(BaP.x > canvas.width) b.velocity.x *= -1
  }
}
