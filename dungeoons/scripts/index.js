let canvas, ctx
let world
let infoPanel
let stats = new Stats()
let settings = {
  tickSpeed: 100,
  playerSpeed: 8,
  playerSize: 4,
  tilePositions: false,
  gridLines: false,
  tileInfoText: false,
  drawPathfinding: false,
  noEnemies: false,
  drawEntityBox: false,
  zoom: 96
}
let debugMode = false

if(debugMode) {
  settings.tilePositions = true
  settings.gridLines = true
  settings.tileInfoText = true
  settings.drawPathfinding = true
  settings.drawEntityBox = true
}


$(() => {
  world = new World()
  infoPanel = new InfoPanel()
  world.rendering.drawFrame()
  stats = new Stats()
  stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
  let statsDom = $(stats.dom)
  statsDom.css({'position': 'absolute', 'left': '350px'})
  $('body').append(statsDom)

  assets.sounds.background.volume(0.5)
  assets.sounds.background.play()
  assets.sounds.background.loop(true)

  updateHotbar()
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