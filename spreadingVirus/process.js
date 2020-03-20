let tickCount = 0
let infectedPuppets = []

function tick() {

  if(options.paused) return

  tickCount += 1
  
  day = Math.floor(tickCount/50)

  
  if(tickCount % 10 == 0) {
    console.time('nearbyPuppets')
    let i = 0
    for(let puppet of puppets) {
      if(puppet.health < 0 || puppet.health == 100) continue
      i++
      puppet.getNearbyPuppets()
    }
    console.timeEnd('nearbyPuppets')
    console.log('calculated count: ', i)
  }
  for(let puppet of puppets) puppet.move()

  if(tickCount % 10 == 0) {
    infectedPuppets = []
    for(let puppet of puppets) {

      if(puppet.health < 0) continue
      if(puppet.health == 100) continue
      infectedPuppets.push(puppet)
    }
  }

  for(let puppet of infectedPuppets) {

    if(puppet.health == 100) continue
    puppet.health--
    
    if(puppet.health < 50) {

      if(puppet.health == 0) {
        // heal
        if(Math.random()*100 < options.surviveChance) {
          puppet.health = 100
          puppet.immunity += 100
          continue
        }
      }

      // infect others
      for(let puppet1 of puppet.nearbyPuppets) {
        if(puppet1.health != 100) continue
        if(puppet1.pos.x == puppet.pos.x && puppet1.pos.y == puppet.pos.y) continue
        let puppet1v = new Vector(puppet.pos.x, puppet.pos.y)
        let puppet2v = new Vector(puppet1.pos.x, puppet1.pos.y)
        let distance = puppet1v.clone().minus(puppet2v).getMagnitude()
        let infectDist = options.infectDistance
        if(distance > infectDist) continue
        let probability = 1 - ((1/infectDist) * distance)
        probability /= 1000
        probability *= options.infectChance
        if(Math.random() < probability) {
          if(Math.random()*100 > puppet1.immunity) {
            puppet1.infect()
          }
        }
      }
    }
  }
}
