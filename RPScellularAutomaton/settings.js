$(() => {
  // pause and unpause
  $('#pause').on('click', () => { isPaused = true })
  $('#unpause').on('click', () => { isPaused = false })

  // rpsn buttons
  $('#r').on('click', () => { drawType = 'r'})
  $('#g').on('click', () => { drawType = 'g'})
  $('#b').on('click', () => { drawType = 'b'})
  $('#n').on('click', () => { drawType = 'n'})

  // speed
  $('#speed').on('change', () => {
    speed = $('#speed').val()
    clearInterval(process)
    process = setInterval(tick, speed)
  })

  // random
  $('#random').on('click', () => {
    for(let x=0; x<grid.length; x++) {
      for(let y=0; y<grid[x].length; y++) {
        let random = Math.round(Math.random()*2)
        if(random == 0) grid[x][y] = 'r'
        if(random == 1) grid[x][y] = 'g'
        if(random == 2) grid[x][y] = 'b'
      }
    }
  })

  // clear
  $('#clear').on('click', () => {
    for(let x=0; x<grid.length; x++) {
      for(let y=0; y<grid[x].length; y++) {
        grid[x][y] = 'n'
      }
    }
  })

  // brushSize
  $('#brushSize').on('change', () => { brushSize = Number($('#brushSize').val()) })

  // cellSize
  $('#cellSize').on('change', () => {

    oldCellSize = cellSize+0
    cellSize = Number($('#cellSize').val())

    // create fresh grid
    let newGrid = []
    for(let x=0; x<canvas.width/cellSize; x++) {
      newGrid.push([])
      for(let y=0; y<canvas.height/cellSize; y++) {

        let type = 'n'
        let tx, ty, num
        if(cellSize > oldCellSize) {
          d = oldCellSize*canvas.width
          c = cellSize*canvas.width
          num = c/d
          tx = Math.round(x*num)
          ty = Math.round(y*num)
        }
        if(cellSize < oldCellSize) {
          d = oldCellSize*canvas.width
          c = cellSize*canvas.width
          num = d/c
          tx = Math.round(x/num)
          ty = Math.round(y/num)
        }
        // if newly created cell.
        if(grid[tx] == undefined || grid[tx][ty] == undefined) type = 'n'
        else type = grid[tx][ty]

        newGrid[x].push(type)
      }
    }
    grid = JSON.parse(JSON.stringify(newGrid))
  })
})