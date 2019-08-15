function frame() {
  window.requestAnimationFrame(frame)
  
  // clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // loop troug layers
  for(let i=settings.layers; i>0; i--) {
      // ctx settings
      ctx.fillStyle = `rgb(0, ${i*settings.colorChange}, 200)`
      if(settings.stroke) ctx.strokeStyle = `rgb(0, ${i*settings.colorChange-settings.strokeStrength}, ${200-settings.strokeStrength})`
      ctx.lineWidth=20

      // start line
      ctx.beginPath()
      ctx.moveTo(0,0)

      // Loop trough points and lineTo them
      for(let j in layers[i]) {
        let point = layers[i][j]
        ctx.lineTo(j*(canvas.width/(settings.totalPoints-1)), point)
      }

      // end line
      ctx.lineTo(canvas.width, 0)
      ctx.closePath()
      if(settings.stroke) ctx.stroke()
      ctx.fill()
  }

  latestFrame = performance.now()
}
