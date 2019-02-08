let houseWidth = 300
let seconds = 0


function frame() {

  let midX = canvas.width/2
  let midY = canvas.height/2

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)

  // draw house
  ctx.lineWidth = 10  
  ctx.fillStyle = 'rgb(192, 149, 87)'
  ctx.beginPath()
  ctx.moveTo(midX-houseWidth, midY+300)
  ctx.lineTo(midX-houseWidth, midY-100)
  ctx.lineTo(midX, midY-400)
  ctx.lineTo(midX+houseWidth, midY-100)
  ctx.lineTo(midX+houseWidth, midY+300)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // draw house Warmth
  ctx.font = "40px Arial"
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.textAlign = 'center'
  let houseTempRounded = Math.round(houseTemp*10)/10
  ctx.fillText(houseTempRounded+'°C', midX, midY)

  // draw outside Warmth
  ctx.font = "40px Arial"
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.textAlign = 'center'
  ctx.fillText(outsideTemp+'°C', midX-600, midY)

  // draw Time box
  ctx.fillStyle = 'rgb(200, 200, 200)'
  ctx.fillRect(0, 0, 180, 130)

  // draw time (Hour - Min)
  ctx.font = "28px Arial"
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.textAlign = 'start'
  ctx.fillText('Hour - Min', 25, 50)

  // draw Time
  ctx.font = "40px Arial"
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.textAlign = 'start'
  let hours = Math.floor(seconds/60/60)
  if(hours < 10) hours = '0' + hours
  let minutes = Math.round(seconds/60)-hours*60
  if(minutes < 10) minutes = '0' + minutes
  ctx.fillText(hours+' : '+minutes, 30, 90)
}
