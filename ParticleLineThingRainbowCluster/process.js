function tick() {
  for(let p of particles) {

    let PaP = p.position
    
    // move with velocity
    PaP.x += p.velocity.x
    PaP.y += p.velocity.y
    PaP.z += p.velocity.z

    // bounce off walls
    if(PaP.x < 1) PaP.x = canvas.width
    if(PaP.y < 1) PaP.y = canvas.height
    if(PaP.z < 1) PaP.z = 1000
    if(PaP.x > canvas.width) PaP.x = 1
    if(PaP.y > canvas.height) PaP.y = 1
    if(PaP.z > 1000) PaP.z = 1
  }
}
