$(() => {
    mouseEventListener()
    keyEventListener()
})





function mouseEventListener() {
    // on mouse down
    $('body').on('mousedown', (event) => {
        if(event.which == 1) input.mouse.down.left = true
        if(event.which == 3) input.mouse.down.right = true

        if(phase == 'drawing') {
            // new line
            drawing.line.show = true
            drawing.line.start = {x: input.mouse.pos.x, y: input.mouse.pos.y}
        }
    })
    // on mouse up
    $('body').on('mouseup', (event) => { 
        if(phase != 'drawing') return
        if(event.which == 1) input.mouse.down.left = false
        if(event.which == 3) input.mouse.down.right = false

        // end line
        drawing.lines.push({start: {x: drawing.line.start.x, y: drawing.line.start.y}, end: {x: input.mouse.pos.x, y: input.mouse.pos.y}, width: drawing.size})
        drawing.line.show = false
    })
    // on mouse move
    $('body').on('mousemove', (event) => {
        input.mouse.pos.x = event.pageX
        input.mouse.pos.y = event.pageY

    })
}
function keyEventListener() {
    $('body').keydown((event) => {
        // ctrl Z. removes last line
        if(event.which == 90 && event.ctrlKey && drawing.lines.length > 4) drawing.lines.splice(-1,1)
    })
}