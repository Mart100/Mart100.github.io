$(() => {
  $('#canvas').on('click', (event) => {

    let posX = event.clientX
    let posY = event.clientY
    let mouse = new Vector(posX, posY)

    for(let puppet of puppets) {
      let puppetv = new Vector(puppet.pos.x, puppet.pos.y)
      let distance = puppetv.clone().minus(mouse).getMagnitude()
      if(distance < puppet.radius) {
        puppet.health = 99
      }
    }
  })
})