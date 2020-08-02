function tick() {
  for(let p of particles) {

    let PaP = p.position
    
    // move with velocity
    PaP.x += p.velocity.x
    PaP.y += p.velocity.y

    // bounce off walls
    if(PaP.x < 0) p.velocity.x *= -1
    if(PaP.y < 0) p.velocity.y *= -1
    if(PaP.x > canvas.width) p.velocity.x *= -1
    if(PaP.y > canvas.height) p.velocity.y *= -1
  }
}
