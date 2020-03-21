let canvas, ctx
let player = {
  pos: new Vector(),
  size: 10
}
let walls = [10, 10, 10, 10]

const synth = new Tone.PolySynth(4, Tone.MonoSynth).toMaster()
const synth1 = new Tone.Synth().toMaster()
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
  await popPlayer()
  await sleep(1000)


  let chars = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("")
  let arr1 = [1, 1, 5, 4, 3, 1, 3, 4, 5, 5, 4, 3, 2, 4, 4, 0, 0, 0, 3, 3, 4, 4, 5, 5, 6, 5, 5, 4, 1, 1, 0, 1, 2, 2]
  let arr = arr1.map(n => n = chars[n]+"4")
  var pattern = new Tone.Pattern((time, note) => {
    synth.triggerAttackRelease(note, 0.10, time);
  }, arr);
  synth.volume.value = -15
  pattern.start(0);

  var pattern1 = new Tone.Pattern((time, note) => {
    synth1.triggerAttackRelease(note, 0.25);
    if(note == "A1") popAll(10, 5)
    if(note == "C2") popAll(20, 5)
    if(note == "C1") popAll(5, 5)
  }, ["A1", "A1", "C2", "A1", "A1", "C1"]);
  synth1.volume.value = 10
  pattern1.start(0);

  Tone.Transport.start();

  //playSong()

  //let player = new Tone.Player('../augite/music1.wav', () => {

  //}).toMaster()
  //player.autostart = true
  //player.loop = true

}

async function die() {
  
}

async function playSong() {
  
  song_bass()
  //song_tune()

}

let song_tune_iter = 0
async function song_tune() {
  song_tune_iter++
  let tone = 200 + ((Math.sin(song_tune_iter/10)*100)%100)
  let tones = [tone, tone+20, tone+40, tone+60, tone+80, tone+100]
  let tune = [1, 1, 5, 4, 3, -1, 3, 4, 5, 5, 4, 3, 2, 4, 4, 0, 0, 0, 3, 3]
  for(let note of tune) {
    sawTooth1(tones[note])
    await sleep(150*2)
  }
}

async function sawTooth1(tone) {
  let osc = new Tone.Oscillator(tone, "sine").toMaster()
  osc.volume.value = -15
  osc.start()
  await sleep(80)
  osc.stop()
}

let song_bass_iter = 0
async function song_bass() {
  song_bass_iter++
  for(let i=0;i<(song_bass_iter%2)+2;i++) {
    synth.triggerAttackRelease('A1', '16n')
    await sleep(160*2)
  }
  synth.triggerAttackRelease('C2', '8n')
  await sleep(160*2)

  song_bass()
}

async function popAll(size=10, speed=10) {
  popPlayerFast(size, speed)
  await sleep(50)
  popWalls(size, speed)
}

async function popWalls(size=10,speed=10) {
  let i = 0
  let func = (x) => -(x*x) + 5*x
  let animationLoop = setInterval(() => {
    i++
    if(i == 50) return clearInterval(animationLoop)
    let y = ((func(i/10)/10)*size)
    walls[0] = 10+y
    walls[1] = 10+y
    walls[2] = 10+y
    walls[3] = 10+y
  }, speed)
}
async function popPlayerFast(size=10,sped=10) {
  let i = 0
  let func = (x) => -(x*x) + 5*x
  let animationLoop = setInterval(() => {
    i++
    if(i == 50) {
      clearInterval(animationLoop)
      player.size = 34
      return
    }
    let y = ((func(i/10)/10)*size)
    player.size = 34+y
    walls[0] = 10+y
    walls[1] = 10+y
    walls[2] = 10+y
    walls[3] = 10+y
  }, sped)
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
    }, ms)
  })
}