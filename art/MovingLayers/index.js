let canvas
let ctx
let trend = 0
// settings
let settings = { 
    totalPoints: 500, 
    speed: 0.5, 
    strength: 15, 
    layers: 2, 
    layerHeight: 500, 
    colorChange: 105, 
    stroke: false, 
    strokeStrength: 10,
    fps: 30
}

let tickInterval
let layers = []
let extraData = {points: []}

reset()

$(() => {
    // setup canvas
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.translate(0, canvas.height)
    ctx.scale(1, -1)

    // run loops
    frame()
    tickInterval = setInterval(() => { tick() }, 20)
})


function reset() {
  // reset
  layers = []

  // create layers
  for(let i=0;i<settings.layers;i++) {
    layers.push([])

    // create points
    for(let j=0;j<settings.totalPoints;j++) {
      layers[i].push(settings.layerHeight*i)
    }
  }

}
