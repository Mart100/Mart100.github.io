function frame() {
  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw rockets and particles
  for(let rocket of rockets) {
    // draw particles
    for(let p of rocket.particles) {
      ctx.beginPath()
      ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${p.color[3]})`
      let PaP = p.position // particle position
      ctx.fillRect(rocket.x+PaP.x, rocket.y+PaP.y, p.shape.x, p.shape.y)
    }

    // draw rocket
    let width = rocket.z*10
    let height = rocket.z*20
    ctx.drawImage(rocketImage, rocket.x*2-width/2+10, rocket.y*2-height+10, width, height)

  }

}