function tick() {
    // if pause is on
    if(settings.toggles.pause) return

    // loop trough grid
    let newGrid = []
    for(let numX in grid) {
        newGrid[numX] = []
        for(let numY in grid[numX]) {
            // if edge return
            if(numX == 0 || numX == gridSize.x-1 || numY == 0 || numY == gridSize.y-1) continue
            // neighbors
            let neighbors = checkNeighbors(Number(numX), Number(numY))

            // if cell is dead
            if(!grid[numX][numY]) {
                // if more than 3cells give birth\
                if(neighbors == 3) newGrid[numX][numY] = true
                else newGrid[numX][numY] = false
            }

            // else if cell is alife
            else {
                // underpopulation ||   overcrowding
                if(neighbors < 2   ||   neighbors > 3) newGrid[numX][numY] = false
                else newGrid[numX][numY] = true
            }
        }
    }
    grid = newGrid
}
function checkNeighbors(X, Y) {
    let neighbors = 0
    if(grid[X-1][Y]) neighbors++
    if(grid[X-1][Y-1]) neighbors++
    if(grid[X][Y-1]) neighbors++
    if(grid[X+1][Y-1]) neighbors++
    if(grid[X+1][Y]) neighbors++
    if(grid[X+1][Y+1]) neighbors++
    if(grid[X][Y+1]) neighbors++
    if(grid[X-1][Y+1]) neighbors++
    return neighbors
}