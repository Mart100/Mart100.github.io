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

  // lsdLevel
  $('#lsdLevel').on('change', () => { lsdLevel = Number($('#lsdLevel').val()) })

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

  // fill
  $('#fill').on('click', () => {
    for(let x=0; x<grid.length; x++) {
      for(let y=0; y<grid[x].length; y++) {
        grid[x][y] = drawType
      }
    }
  })

  // generator
  $('#generator').on('click', () => {

    // fill world
    let temp = drawType
    drawType = 'r'
    $('#fill').click()
    drawType = temp

    // put none space in middle
    let startx = Math.floor(canvas.width/2/cellSize - 30/cellSize)
    let lenx = Math.floor(canvas.width/2/cellSize + 30/cellSize)
    for(let x=startx; x<lenx; x++) {
      let starty = Math.floor(canvas.height/2/cellSize - 30/cellSize)
      let leny = Math.floor(canvas.height/2/cellSize + 30/cellSize)
      for(let y=starty; y<leny; y++) {
        grid[x][y] = 'n'
      }
    }


    let b = {
      x: Math.floor(canvas.width/2/cellSize - 30/cellSize),
      y: Math.floor(canvas.height/2/cellSize - 30/cellSize)
    }

    // place 2x3 of blue
    grid[b.x][b.y-1] = 'b'
    grid[b.x][b.y-2] = 'b'
    grid[b.x][b.y-3] = 'b'
    grid[b.x+1][b.y-1] = 'b'
    grid[b.x+1][b.y-2] = 'b'
    grid[b.x+1][b.y-3] = 'b'

    // place 2x3s of green
    grid[b.x+2][b.y-1] = 'g'
    grid[b.x+2][b.y-2] = 'g'
    grid[b.x+2][b.y-3] = 'g'
    grid[b.x+3][b.y-1] = 'g'
    grid[b.x+3][b.y-2] = 'g'
    grid[b.x+3][b.y-3] = 'g'

  })

  // Save
  $('#save').on('click', () => {
    //var content = content of file;
    $('body').append('<textarea id="saveText" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></textarea>')
    let gridString = gridToString()
    $('#saveText').html(gridString)
    $('#saveText').select()
    document.execCommand("copy")
    $('#saveText').remove()
    $('#save').html('Copied to clipboard')
    setTimeout(() => { $('#save').html('Save')}, 1000)
    
  })

  // Load
  $('#load').on('click', () => {
    //var content = content of file;
    $('body').append('<textarea id="loadText" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></textarea>')
    $('#loadText').select()
    $('#loadText').on('paste', () => {
      setTimeout(() => {

        grid = stringToGrid($('#loadText').val())
        if(grid != undefined) $('#loadText').remove()

      }, 10)
    })
    
  })
})


function stringToGrid(gridString) {
  
  let newGrid = []
  let i = 0
  // create grid
  for(let x=0; x<canvas.width/cellSize; x++) {
    newGrid.push([])
    for(let y=0; y<canvas.height/cellSize; y++) {
      i++
      newGrid[x].push(gridString[i])
    }
  }

  return JSON.parse(JSON.stringify(newGrid))
}

function gridToString() {
  return grid.flat(1).join().replace(/,/g, '')
}

//keys are possible combinations, and the values are the base64 character
let codings = {}
let colorArr = ['r', 'g', 'b', 'n']
let base64chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+'

let l = 0
for(let i = 0; i < 4; i++) {
  for(let j = 0; j < 4; j++) {
    for(let k = 0; k < 4; k++) {
      codings[i+j+k] = base64chars[l]
      l++
    }
  }
}

let inverseCodings = swap(codings)

function VKstringToGrid(gridString) {
  //let gridString = []
  for(let char in gridString.split('')) {
    gridString.push(inverseCodings[char])
  }

  let newGrid = []
  let i = 0
  // create grid
  for(let x=0; x<canvas.width/cellSize; x++) {
    newGrid.push([])
    for(let y=0; y<canvas.height/cellSize; y++) {
      i++
      newGrid[x].push(gridString[i])
    }
  }
  return JSON.parse(JSON.stringify(newGrid))
}

function VKgridToString() {
  let gridStringBig = grid.flat(1).join().replace(/,/g, '')
  let gridStringShort = []
  for(let i = 0; i < gridString.length; i += 3) {
    if(gridStringBig[i+1] == undefined) gridStringBig[i+1] = 'n'
    if(gridStringBig[i+2] == undefined) gridStringBig[i+2] = 'n'
    gridStringShort.push(codings[gridStringBig[i]+gridStringBig[i+1]+gridStringBig[i+2]])
  }
  return gridStringShort.join('')
}

function swap(json){
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  return ret;
}