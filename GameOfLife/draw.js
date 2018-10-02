
function frame() {
    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // loop trough grid
    for(let numX in grid) {
        for(let numY in grid[numX]) {
            if(!grid[numX][numY]) continue
            // draw cell
            ctx.fillRect(/* Pos */canvas.width/gridSize.x*numX, canvas.height/gridSize.y*numY, /* Size*/canvas.width/gridSize.x, canvas.height/gridSize.y)
        }
    }
}
