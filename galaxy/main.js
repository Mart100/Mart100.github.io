let canvas
let ctx
let grd
const Simulation = {'year': 0, 'phase': 'bigbang'}
const Screen = { 'width': window.screen.width, 'height': window.screen.height }
const Dots = {}


$(function() {
  canvas = document.getElementById('canvas')
  canvas.width = Screen.width
  canvas.height = Screen.height
  CreateDots()
  setInterval(function() { SimulationFrame() }, 10)
})

/*async function createBigBang() {
  let i = 0
  let BigBangPhase1 = setInterval(function() {
    if(i >= 9995) {
      clearInterval(BigBangPhase1)
      CreateGassClouds()
    }
    i++
    ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grd = ctx.createRadialGradient(Screen.width/2, Screen.height/2, i/100, Screen.width/2, Screen.height/2, i/10);
    grd.addColorStop(0,"#b5b5b5");
    grd.addColorStop(i/10000,"#b5b5b5");
    grd.addColorStop(1,"black");
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, Screen.width, Screen.height);
  }, 1)
}*/
function CreateDots() {
  let x,y,size,spreadSize

  for(i = 0; i < 10000; i++) {
    r = 1
    let a = Math.random()
    let b = Math.random()

    let temp = [ b * r * Math.cos( 2 * Math.PI * a / b )
              ,  b * r * Math.sin( 2 * Math.PI * a / b )   ]
    //console.log(`speedX: ${tempY}      speedY: ${tempX}`)
    Dots[i] = {
      'speedX': temp[0],
      'speedY': temp[1],
      'mass': Math.random() * 2,
      'pos': {
        'y': Screen.height / 2,
        'x': Screen.width /2
      }
    }
  }
}
function SimulationFrame() {
  // Reset canvas
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  Simulation.year++
  $('#infoPanel').html(Simulation.year)
  // All Dots
  for(let i = 0; i < 10000; i++) {
    var ctx = canvas.getContext('2d')
    let nextY = Dots[i].pos.y + Dots[i].speedY
    let nextX = Dots[i].pos.x + Dots[i].speedX
    Dots[i].pos.x = nextX
    Dots[i].pos.y = nextY
    ctx.beginPath()
    ctx.arc(nextX, nextY, Dots[i].mass,0,2*Math.PI)
    ctx.globalAlpha = 0.01 + Dots[i].mass / 10
    ctx.fillStyle = '#ffffff'
    ctx.fill()
  }

}
