let canvas, ctx
let player = {
  pos: new Vector(),
  size: 10
}
const synth = new Tone.Synth().toMaster()

$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  player.pos.x = canvas.width/2
  player.pos.y = canvas.height/2
  
  $(document).one('click', () => {
    start()
  })
  frame()
  
  setInterval(() => { tick() }, 10)
})

async function start() {
  synth.triggerAttackRelease('F3', '8n')
  $('#title').animate({"top": "5%", "opacity": "0"}, 500)
  await sleep(1000)
  await popPlayer()


  let player = new Tone.Player('./music1.wav').toMaster()
  player.autostart = true

}

async function popPlayer() {
  let i = 0
  let animationLoop = setInterval(() => {
    i++
    if(i == 100) {
      clearInterval(animationLoop)
      player.size = 34
      return
    }
    player.size = 10+((sigmoid(i/25)-0.5)*50)
  }, 10)
}
function sigmoid(x) {
  return 1/(1+Math.pow(Math.E, -x))
}

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 10)
  })
}