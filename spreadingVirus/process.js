let tickCount = 0

function tick() {
  tickCount += 1

  if(tickCount % 10 == 0) {
    for(let puppet of puppets) {
      if(puppet.health < 0 || puppet.health == 100) continue
      puppet.getNearbyPuppets()
    }
  }
  for(let puppet of puppets) {

    if(puppet.health < 0) continue

    puppet.move()

    if(puppet.health < 100) {
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
              puppet1.health -= 1
            }
          }
        }
      }
    }
  }
}
