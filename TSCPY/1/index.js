let canvas, ctx
let keys = {}
let mouse = {pos:{x:0,y:0}}
let world
let isPaused = false
let infoPanel
let settings = {
  drawConnectonSearch: true,
  spawnTool: {
    amount: 10,
    radius: 100
  },
  speed: 1000,
  speedS: 10
}

/*====KEYBINDS====
p: spawn connectons
================*/

$(() => {
  // prepare canvas
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  infoPanel = new InfoPanel()
  world = new World()
  world.grid.loadScreen()

  // call functions
  frame()
  setInterval(() => { tick() }, 10)
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