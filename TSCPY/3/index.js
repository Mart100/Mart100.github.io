let canvas, ctx
let keys = {}
let grid
let mouse = {pos:{x:0,y:0}}

$(() => {
  // prepare canvas
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  grid = new Grid()
  grid.loadScreen()

  // call functions
  frame()
  setInterval(() => { tick() }, 100)
})

function randomRGB() {
  let rgb = []
  rgb[0] = Math.floor(Math.random()*255)
  rgb[1] = Math.floor(Math.random()*255)
  rgb[2] = Math.floor(Math.random()*255)
  rgb[3] = 255
  return rgb
}

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}