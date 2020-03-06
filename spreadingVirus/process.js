function tick() {
  for(let puppet of puppets) {

    if(puppet.health < 0) continue

    if(puppet.health < 100) {
      puppet.health--
      
      if(puppet.health < 50) {

        // heal
        let rand = Math.floor(Math.random()*((100-options.surviveChance)*2))
        if(rand == 0) {
          puppet.health = 100
          puppet.immunity += 50
          continue
        }

        // infect others
        for(let puppet1 of puppets) {
          if(puppet1.health != 100) continue
          if(puppet1.pos.x == puppet.pos.x && puppet1.pos.y == puppet.pos.y) continue
          let puppet1v = new Vector(puppet.pos.x, puppet.pos.y)
          let puppet2v = new Vector(puppet1.pos.x, puppet1.pos.y)
          let distance = puppet1v.clone().minus(puppet2v).getMagnitude()
          let infectDist = options.infectDistance
          if(distance > infectDist) continue
          let probability = 1 - ((1/infectDist) * distance)
          probability /= options.infectChance
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
