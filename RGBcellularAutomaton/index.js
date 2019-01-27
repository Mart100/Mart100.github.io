let canvas, ctx
let grid = []
let mouseDown = false
let mousePos = {x: 0, y: 0}
let cellSize = 10
let brushSize = 50
let lsdLevel = 100
let drawType = 'n'
let isPaused = true
let speed = 1
let process

/*
red   eats  blue
green eats  red
blue  eats  green
*/


$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  frame()
  process = setInterval(tick, speed)

  // create grid
  for(let x=0; x<canvas.width/cellSize; x++) {
    grid.push([])
    for(let y=0; y<canvas.height/cellSize; y++) {
      grid[x].push('n')
    }
  }
})

// drawing cells
$(() => {
  setInterval(() => {
    // if mouse hold
    if(mouseDown) {
      // loop trough 10x10 pixels past mouse to fill

      let lenx = Number(mousePos.x+brushSize/2)
      let startx = Number(mousePos.x-brushSize/2)

      for(let x=startx; x<lenx; x++) {
        if(grid[x/cellSize] == undefined) continue

        let leny = Number(mousePos.y+brushSize/2)
        let starty = Number(mousePos.y-brushSize/2)

        for(let y=starty; y<leny; y++) {

          if(grid[x/cellSize][y/cellSize] == undefined) continue
          grid[x/cellSize][y/cellSize] = drawType
          
        }
      } 
    }
  }, 1)
})

// Mouse event listener
$(() => {
  // mouse move 
  $('canvas').on('mousemove', (e) => { mousePos = {x: e.clientX, y: e.clientY} })

  // mouse up and down
  $('canvas').on('mouseup', () => { mouseDown = false })
  $('canvas').on('mousedown', () => { mouseDown = true })
})