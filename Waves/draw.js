function frame() {
    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // draw waves
    ctx.fillStyle = '#0077be'
    ctx.strokeStyle = '#0067a5'
    ctx.lineWidth=20
    ctx.beginPath()
    ctx.moveTo(0,0)
    // Loop trough points and lineTo them
    for(let num in points) {
        let point = points[num]
        ctx.lineTo(num*(canvas.width/(settings.totalPoints-1)), point)
    }
    ctx.lineTo(canvas.width, 0)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
}
