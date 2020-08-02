let canvas, ctx
let world
let infoPanel
let settings = {
  playerSpeed: 500
}
let canvasList = {}
let ctxList = {}

$(() => {

  canvasList['entities'] = document.getElementById('entities')
  ctxList['entities'] = canvasList['entities'].getContext('2d')
  canvasList['entities'].width = window.innerWidth
  canvasList['entities'].height = window.innerHeight
  ctxList['entities'].mozImageSmoothingEnabled = false
  ctxList['entities'].imageSmoothingEnabled = false

  canvasList['particles'] = document.getElementById('particles')
  ctxList['particles'] = canvasList['particles'].getContext('2d')
  canvasList['particles'].width = window.innerWidth
  canvasList['particles'].height = window.innerHeight

  infoPanel = new InfoPanel()
  world = new World()
  world.load()

  frame()
})

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min
}