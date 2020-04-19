let num = 0

function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)

  num += 10

  ctx.strokeStyle = 'black'


  let spot = {x: canvas.width/20, y: canvas.height/20}
  ctx.moveTo(spot.x*10, spot.y*10)


  // loop trough circles
  let dots = 0
  for(let i=0;i<50;i++) {
    // loop trough directions
    for(let j=0;j<4;j++) {
      let dir = {}
      if(j == 0) dir = {x: 1, y: 0}
      if(j == 1) dir = {x: 0, y: 1}
      if(j == 2) dir = {x: -1, y: 0}
      if(j == 3) dir = {x: 0, y: -1}

      // loop trough grid
      for(let k=0;k<i*2+Math.round(j/2);k++) {
        dots++
        if(dots > num) break
        spot.x += dir.x
        spot.y += dir.y
        ctx.lineTo(spot.x*10, spot.y*10)
      }
      if(dots > num) break
    }
    if(dots > num) break
    
  }
  ctx.stroke()

}
