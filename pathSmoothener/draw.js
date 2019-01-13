function frame() {
    if(points[0] == undefined) return
    // draw path between simple points
    ctx.strokeStyle = '#ddff00'
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for(num in points) ctx.lineTo(points[num].x, points[num].y)
    ctx.stroke()

    // draw points
    ctx.fillStyle = '#FF0000'
    for(num in points) {
        let point = points[num]
        ctx.beginPath()
        ctx.arc(point.x,point.y,10,0,2*Math.PI)
        ctx.fill()
    }

    // draw more points
    ctx.fillStyle = '#4256f4'
    for(num in morepoints) {
        let point = morepoints[num]
        ctx.beginPath()
        ctx.arc(point.x,point.y,6,0,2*Math.PI)
        ctx.fill()
    }
}
