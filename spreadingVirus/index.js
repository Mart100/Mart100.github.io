let canvas, ctx
let puppets = []
let options = {
  infectDistance: 100,
  amount: 1500,
  infectChance: 10,
  surviveChance: 75
}


$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  frame()
  setInterval(() => { tick() }, 10)

  createRandomPuppets(options.amount)
})


function createRandomPuppets(amount) {
  let currentPuppetAmount = puppets.length
  while(currentPuppetAmount+amount > puppets.length) {

    let randomX = Math.random()*canvas.width
    let randomY = Math.random()*canvas.height
    let puppet = new Puppet(randomX, randomY)

    let overlap = false
    for(let puppetL of puppets) {
      let puppet1v = new Vector(randomX, randomY)
      let puppet2v = new Vector(puppetL.pos.x, puppetL.pos.y)
      let distance = puppet1v.clone().minus(puppet2v).getMagnitude()
      if(distance < puppet.radius+puppetL.radius) overlap = true

    }

    if(!overlap) puppets.push(puppet)
    
  }
}