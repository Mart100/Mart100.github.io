function frame() {
    // clear screen
    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)

    ctx.drawImage(background, -canvas.width/2-0.5, -canvas.height/2-0.5, canvas.width, canvas.height)

    // create outer circle
    ctx.strokeStyle = 'white'
    ctx.fillStyle = settings.backgroundInnerLayer
    ctx.lineWidth = size/18
    ctx.beginPath()
    ctx.arc(0, 0, size, 0, 2*Math.PI)
    ctx.stroke()
    ctx.fill()


    // create inner circle
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = size/40
    ctx.beginPath()
    ctx.arc(0, 0, size/20, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()

    // seconds
    ctx.lineWidth = settings.pointers.seconds.thick
    ctx.strokeStyle = settings.pointers.seconds.color
    ctx.lineCap = settings.pointers.seconds.lineCap
    ctx.beginPath()
    ctx.moveTo(0,0)
    if(settings.pointers.seconds.smoothAnimation == 'ease') {
        ctx.lineTo(Math.cos(toRad((easeInOutCubic(time.ms/1000)+time.s)/60*360-90))*size/1.03, Math.sin(toRad((easeInOutCubic(time.ms/1000)+time.s)/60*360-90))*settings.pointers.seconds.length)
    } else if(settings.pointers.seconds.smoothAnimation == 'linear') {
        ctx.lineTo(Math.cos(toRad((time.ms/1000+time.s)/60*360-90))*size/1.03,Math.sin(toRad((time.ms/1000+time.s)/60*360-90))*settings.pointers.seconds.length)
    } else {
        ctx.lineTo(Math.cos(toRad(time.s/60*360-90))*size/1.03,Math.sin(toRad(time.s/60*360-90))*settings.pointers.seconds.length)
    }
    ctx.stroke()

    // minutes
    ctx.lineWidth = settings.pointers.minutes.thick
    ctx.strokeStyle = settings.pointers.minutes.color
    ctx.lineCap = settings.pointers.minutes.lineCap
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(Math.cos(toRad((time.s/60+time.m)/60*360-90))*size/1.1,Math.sin(toRad((time.s/60+time.m)/60*360-90))*settings.pointers.minutes.length)
    ctx.stroke()

    // hours
    ctx.lineWidth = settings.pointers.hours.thick
    ctx.strokeStyle = settings.pointers.hours.color
    ctx.lineCap = settings.pointers.hours.lineCap
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(Math.cos(toRad((time.m/60+time.h)/12*360-90))*size/1.8,Math.sin(toRad((time.m/60+time.h)/12*360-90))*settings.pointers.hours.length)
    ctx.stroke()


    // extra outer circle
    if(settings.extraOuterCircle) {
        // draw extra outer circle
        ctx.strokeStyle = 'white'
        ctx.lineWidth = size/18
        ctx.beginPath()
        ctx.arc(0, 0, size+size/2.5, 0, 2*Math.PI)
        ctx.stroke()
    }


    // draw Roman numerals
    if(settings.romanNumbers.show) {
        // 12
        drawRomanX(-size/10.5, -size-size/5)
        drawRomanI(size/20, -size-size/5)
        drawRomanI(size/7, -size-size/5)

        // 3
        drawRomanI(size+size/9, 0)
        drawRomanI(size+size/5, 0)
        drawRomanI(size+size/3.5, 0)

        // 6
        drawRomanV(-size/20, size+size/5)
        drawRomanI(size/12, size+size/5)

        // 9
        drawRomanI(-size-size/3.5, 0)
        drawRomanX(-size-size/7, 0)

    }

}

function toRad (angle) { return angle * (Math.PI / 180) }

function easeInOutCubic(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }

// Roman numerals
function drawRomanI(x, y) {
    ctx.save()
    ctx.lineCap = 'butt'
    ctx.strokeStyle = 'white'

    // main line
    ctx.lineWidth = size/25
    ctx.beginPath()
    ctx.moveTo(x, y-size/8)
    ctx.lineTo(x, y+size/8)
    ctx.stroke()

    // top line
    ctx.lineWidth = size/50
    ctx.beginPath()
    ctx.moveTo(x-size/20, y-size/8)
    ctx.lineTo(x+size/20, y-size/8)
    ctx.stroke()

    // bottom line
    ctx.lineWidth = size/50
    ctx.beginPath()
    ctx.moveTo(x-size/20, y+size/8)
    ctx.lineTo(x+size/20, y+size/8)
    ctx.stroke()


    ctx.restore()
}
function drawRomanX(x, y) {
    ctx.save()
    ctx.lineCap = 'butt'
    ctx.strokeStyle = 'white'

    // draw Main line - LeftTop to RightBottom
    ctx.lineWidth = size/35
    ctx.beginPath()
    ctx.moveTo(x-size/15, y-size/8)
    ctx.lineTo(x+size/15, y+size/8)
    ctx.stroke()

    // draw Main line - RightBottom to LeftTop
    ctx.lineWidth = size/35
    ctx.beginPath()
    ctx.moveTo(x+size/15, y-size/8)
    ctx.lineTo(x-size/15, y+size/8)
    ctx.stroke()
    
    // top left line
    ctx.lineWidth = size/50
    ctx.beginPath()
    ctx.moveTo(x-size/10, y-size/8)
    ctx.lineTo(x-size/50, y-size/8)
    ctx.stroke()

    // top right line
    ctx.lineWidth = size/50
    ctx.beginPath()
    ctx.moveTo(x+size/10, y-size/8)
    ctx.lineTo(x+size/50, y-size/8)
    ctx.stroke()

    // bottom left line
    ctx.lineWidth = size/50
    ctx.beginPath()
    ctx.moveTo(x-size/10, y+size/8)
    ctx.lineTo(x-size/50, y+size/8)
    ctx.stroke()

    // bottom right line
    ctx.lineWidth = size/50
    ctx.beginPath()
    ctx.moveTo(x+size/10, y+size/8)
    ctx.lineTo(x+size/50, y+size/8)
    ctx.stroke()


}
function drawRomanV(x, y) {
    ctx.save()
    ctx.lineCap = 'butt'
    ctx.strokeStyle = 'white'

    // draw Main line - Left
    ctx.lineWidth = size/35
    ctx.beginPath()
    ctx.moveTo(x-size/12, y-size/8)
    ctx.lineTo(x+size/400, y+size/8)
    ctx.stroke()

    // draw Main line - Right
    ctx.lineWidth = size/35
    ctx.beginPath()
    ctx.moveTo(x+size/12, y-size/8)
    ctx.lineTo(x-size/400, y+size/8)
    ctx.stroke()

    // top left line
    ctx.lineWidth = size/50
    ctx.beginPath()
    ctx.moveTo(x-size/8, y-size/8)
    ctx.lineTo(x-size/30, y-size/8)
    ctx.stroke()

    // top right line
    ctx.lineWidth = size/50
    ctx.beginPath()
    ctx.moveTo(x+size/8, y-size/8)
    ctx.lineTo(x+size/30, y-size/8)
    ctx.stroke()
}