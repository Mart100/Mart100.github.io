function frame() {
  // rerun frame
  //window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // some variables
  let screenHeight = canvas.height
  let dayDuration = 24*60
  let currentHeight = 0

  for(let i in planning) {
    i = Number(i)

    let activity = planning[i]
    let nextActivity = planning[i+1] || planning[0]

    let start = timeParser(activity.start)
    let end = timeParser(nextActivity.start)

    let duration = end-start
    let procentage = duration/dayDuration
    let startHeight = screenHeight*(start/dayDuration)
    let endHeight = screenHeight*(end/dayDuration)
    let middleHeight = endHeight + (startHeight/2)
    let height = endHeight-startHeight
    let color = activity.color

    if(height < 0) {
      height = (screenHeight-startHeight)*procentage
      ctx.beginPath()
      ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
      ctx.fillRect(0, 0, canvas.width, endHeight)
    }

    ctx.beginPath()
    ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
    ctx.fillRect(0, startHeight, canvas.width, height)

    ctx.beginPath()
    ctx.fillStyle = `rgb(0,0,0)`
    ctx.fillText(activity.name, 10, middleHeight)

    console.log(start, end, duration, height, startHeight)

    currentHeight += height
  }
  
}