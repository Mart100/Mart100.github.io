let houseWidth = window.innerWidth/6 //300
let houseHeight = window.innerHeight/2.5 //400
let seconds = 0


function frame() {

  let midX = canvas.width/2
  let midY = canvas.height/2
  let width = canvas.width
  let height = canvas.height

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw house
  let HmX = midX+width/10 // house Mid X
  let HmY = midY // house Mid Y
  ctx.lineWidth = 10  
  ctx.fillStyle = `rgba(192, 149, 87, ${(houseTemp-outsideTemp)/20})`
  ctx.beginPath()
  ctx.moveTo(HmX-houseWidth, HmY+houseHeight/1.33)
  ctx.lineTo(HmX-houseWidth, HmY-houseHeight/5)
  ctx.lineTo(HmX, HmY-houseHeight)
  ctx.lineTo(HmX+houseWidth, HmY-houseHeight/5)
  ctx.lineTo(HmX+houseWidth, HmY+houseHeight/1.33)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // draw house Warmth
  ctx.font = "40px Arial"
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.textAlign = 'center'
  let houseTempRounded = Math.round(houseTemp*10)/10
  ctx.fillText(houseTempRounded+'°C', HmX, midY)

  // draw outside Warmth
  ctx.font = "40px Arial"
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.textAlign = 'center'
  ctx.fillText(outsideTemp+'°C', width/5, midY)

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
