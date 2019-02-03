function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw yellow light around player
  let light = ctx.createRadialGradient(mouse.pos.x, mouse.pos.y, 10, mouse.pos.x, mouse.pos.y, 600)
  light.addColorStop(0, 'yellow')
  light.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = light
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // draw unseeAble area
  ctx.fillStyle = 'rgb(35, 35, 35)'

  // loop trough all objects
  for(let i in objects) {
    let object = objects[i]
    ctx.beginPath()
    let objectMouseAngle = mouse.pos.clone().minus(object.getPos()).getAngle()

    // temp sort corners on angle
    let sortedCorners = JSON.parse(JSON.stringify(object.corners)).sort((a, b) => {
      let angleA = mouse.pos.clone().minus(a).getAngle()-objectMouseAngle
      let angleB = mouse.pos.clone().minus(b).getAngle()-objectMouseAngle
      a.angleToMouse = angleA
      b.angleToMouse = angleB
      return Math.abs(angleB)-Math.abs(angleA)
    })

    let c0 = sortedCorners[0]
    let c1 = sortedCorners[1]
    if(c0.angleToMouse * c1.angleToMouse > 0) c1 = sortedCorners[2]
    let mouseInverted0 = mouse.pos.clone().minus(c0).multiply(-1e9).plus(c0)
    let mouseInverted1 = mouse.pos.clone().minus(c1).multiply(-1e9).plus(c1)
    ctx.moveTo(c0.x, c0.y)
    ctx.lineTo(mouseInverted0.x, mouseInverted0.y)
    ctx.lineTo(mouseInverted1.x, mouseInverted1.y)
    ctx.lineTo(c1.x, c1.y)

    ctx.closePath()
    ctx.fill()
  }

  // when mouse in cube. Remove light
  for(let i in objects) {
    let object = objects[i].clone().removeRotation()
    let objectPos = object.getPos()
    let newMousePos = mouse.pos.clone().minus(objectPos).rotate(objects[i].rot).plus(objectPos)
    if(object.corners[0].x < newMousePos.x &&
       object.corners[2].x > newMousePos.x &&
       object.corners[0].y < newMousePos.y &&
       object.corners[2].y > newMousePos.y) {
        // mouse is in cube
        ctx.fillStyle = 'rgb(35, 35, 35)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }


  }


  // draw all objects
  ctx.fillStyle = 'white'
  for(let i in objects) {
    let object = objects[i]
    ctx.beginPath()
    
    // loop trough corners
    for(let j in object.corners) {
      let corner = object.corners[j]
      if(j == 0) ctx.moveTo(corner.x, corner.y)
      else ctx.lineTo(corner.x, corner.y)
    }
    ctx.closePath()
    ctx.fill()
  }

  // draw little dot at mouse
  ctx.beginPath()
  ctx.fillStyle = '#000000'
  ctx.arc(mouse.pos.x, mouse.pos.y, 5, 0, 2 * Math.PI)
  ctx.fill()
}
