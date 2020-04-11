let canvas, ctx
let puppets = []
let datarecords = []
let camera = {
  x: 0,
  y: 0,
  zoom: 1
}
let day = 0
let firstInfection = 0
let options = {
  infectDistance: 50,
  amount: 10000,
  checkOverlap: false,
  infectChance: 10,
  surviveChance: 98,
  size: 2500,
  density: 50,
  noisePopulation: true,
  clearScreen: true,
  moveRange: 200,
  moveSpeed: 4,
  lockdown: false,
  paused: false,
  drawing: true
}
let seed = Math.random()


$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  frame()
  setInterval(() => { 
    tick()
  }, 50)

  setInterval(() => { 
    createDatarecord()
  }, 500)

  setInterval(() => {
    updateInfoTab()
  }, 1000)

  restart()
})

function restart() {
  puppets = []
  datarecords = []
  day = 0
  options.amount = (options.size*options.size) * (options.density/(300*100))
  clearScreen()
  createRandomPuppets(options.amount)
}

function ptest() {
  options.size = 10000
  options.density = 50
  restart()
}


function createRandomPuppets(amount) {
  let currentPuppetAmount = puppets.length
  while(currentPuppetAmount+amount > puppets.length) {

    let randomX = Math.random()*options.size
    let randomY = Math.random()*options.size
    let puppet = new Puppet(randomX, randomY)

    if(options.noisePopulation) {
      noise.seed(this.seed*1.1)
      let noiseSize = 200
      let noiseVal = noise.perlin2(randomX/noiseSize, randomY/noiseSize)
      noiseVal += 0.1
      if(Math.random() > noiseVal) continue
    }

    if(options.checkOverlap) {
      let overlap = false
      for(let puppetL of puppets) {
        let puppet1v = new Vector(randomX, randomY)
        let puppet2v = new Vector(puppetL.pos.x, puppetL.pos.y)
        let distance = puppet1v.clone().minus(puppet2v).getMagnitude()
        if(distance < puppet.radius+puppetL.radius) overlap = true
  
      }
  
      if(!overlap) puppets.push(puppet)
    } else {
      puppets.push(puppet)
    }

    
  }
}

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 10)
  })
}