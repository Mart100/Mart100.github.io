function frame() {
    // clear screen
    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)

    ctx.drawImage(background, -canvas.width/2-0.5, -canvas.height/2-0.5, canvas.width, canvas.height)

    // create outer circle
    ctx.strokeStyle = 'white'
    ctx.lineWidth = size/18
    ctx.beginPath()
    ctx.arc(0, 0, size, 0, 2*Math.PI)
    ctx.stroke()


    // create inner circle
    ctx.strokeStyle = 'white'
    ctx.lineWidth = size/40
    ctx.beginPath()
    ctx.arc(0, 0, size/20, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()

    // create clock arrows
    ctx.strokeStyle = 'black'


    // seconds
    ctx.lineWidth = size/70
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(Math.cos(toRad(time.s/60*360-90))*size/1.03,Math.sin(toRad(time.s/60*360-90))*size/1.03)
    ctx.stroke()

    // minutes
    ctx.lineWidth = size/35
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(Math.cos(toRad(time.m/60*360-90))*size/1.1,Math.sin(toRad(time.m/60*360-90))*size/1.1)
    ctx.stroke()

    // hours
    ctx.lineWidth = size/20
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(Math.cos(toRad(time.h/12*360-90))*size/1.8,Math.sin(toRad(time.h/24*360-90))*size/1.8)
    ctx.stroke()

}

function toRad (angle) { return angle * (Math.PI / 180) }