function frame() {
    requestAnimationFrame(frame)
    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // loop trough lines
    for(let num in drawing.lines) {
        let line = drawing.lines[num]
        ctx.lineWidth=line.width
        ctx.beginPath()
        ctx.moveTo(line.start.x, line.start.y)
        ctx.lineTo(line.end.x, line.end.y)
        ctx.stroke()
    }
    // current line
    if(drawing.line.show) {
        ctx.lineWidth=drawing.size
        ctx.beginPath()
        ctx.moveTo(drawing.line.start.x, drawing.line.start.y)
        ctx.lineTo(input.mouse.pos.x, input.mouse.pos.y)
        ctx.stroke()
    }

    // start
    ctx.fillStyle = 'rgba(0, 255, 0, 0.4)'
    ctx.fillRect(25, 25, 100, 100) 

    // finnish
    /* b1 w1 b2 w2
       w3 b3 w4 b4
       b5 w5 b6 w6
       w7 b7 w8 b8
    */
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.fillRect(screen.width-25-100, screen.height-25-100, 25, 25) //b1
    ctx.fillRect(screen.width-25-50,  screen.height-25-100, 25, 25) //b2
    ctx.fillRect(screen.width-25-75,  screen.height-25-75, 25, 25) //b3
    ctx.fillRect(screen.width-25-25,  screen.height-25-75, 25, 25) //b4
    ctx.fillRect(screen.width-25-100, screen.height-25-50, 25, 25) //b1
    ctx.fillRect(screen.width-25-50,  screen.height-25-50, 25, 25) //b2
    ctx.fillRect(screen.width-25-75,  screen.height-25-25, 25, 25) //b3
    ctx.fillRect(screen.width-25-25,  screen.height-25-25, 25, 25) //b4

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    ctx.fillRect(screen.width-25-75, screen.height-25-100, 25, 25) //w1
    ctx.fillRect(screen.width-25-25,  screen.height-25-100, 25, 25) //w2
    ctx.fillRect(screen.width-25-100,  screen.height-25-75, 25, 25) //w3
    ctx.fillRect(screen.width-25-50,  screen.height-25-75, 25, 25) //w4
    ctx.fillRect(screen.width-25-75, screen.height-25-50, 25, 25) //w1
    ctx.fillRect(screen.width-25-25,  screen.height-25-50, 25, 25) //w2
    ctx.fillRect(screen.width-25-100,  screen.height-25-25, 25, 25) //w3
    ctx.fillRect(screen.width-25-50,  screen.height-25-25, 25, 25) //w4

    // mouse thing
    ctx.lineWidth=2
    ctx.beginPath()
    ctx.rect(input.mouse.pos.x-drawing.size/2, input.mouse.pos.y-drawing.size/2, drawing.size, drawing.size)
    ctx.stroke()

}
