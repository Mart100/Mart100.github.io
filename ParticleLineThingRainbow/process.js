function tick() {
  for(let p of particles) {

    let PaP = p.position
    
    // move with velocity
    PaP.x += p.velocity.x
    PaP.y += p.velocity.y
    PaP.z += p.velocity.z

    // bounce off walls
    if(PaP.x < 1) p.velocity.x *= -1
    if(PaP.y < 1) p.velocity.y *= -1
    if(PaP.z < 1) p.velocity.z *= -1
    if(PaP.x > canvas.width) p.velocity.x *= -1
    if(PaP.y > canvas.height) p.velocity.y *= -1
    if(PaP.z > 1000) p.velocity.z *= -1
  }
}
