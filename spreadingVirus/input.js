let keys = {}
let mouse = {
  pos: new Vector(0, 0)
}

$(() => {
  $('#canvas').on('click', (event) => {

    let posX = event.clientX
    let posY = event.clientY
    let mouse = new Vector(posX, posY)

    for(let puppet of puppets) {
      let puppetv = puppet.getWindowLocation()
      let distance = puppetv.clone().minus(mouse).getMagnitude()
      if(distance < puppet.radius) {
        puppet.infect()
        if(datarecords[datarecords.length-1].infected == 0) firstInfection = tickCount
      }
    }
  })

  // mouse move
  $('#canvas').on('mousemove', (event) => {
    mouse.pos.x = event.clientX
    mouse.pos.y = event.clientY
  })

  // keyboard
  $(document).on('keydown', (event) => { keys[event.keyCode] = true })
  $(document).on('keyup',   (event) => { keys[event.keyCode] = false })

  // listen for zooming
  $('#canvas').on('DOMMouseScroll mousewheel', (event) => {

    let mouseMapPos = {x: 0, y: 0}
    mouseMapPos.x = (mouse.pos.x/camera.zoom)+camera.x
    mouseMapPos.y = (mouse.pos.y/camera.zoom)+camera.y

    let zoom = camera.zoom*0.05

    // zoom out
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      camera.zoom -= zoom
      camera.x -= (mouseMapPos.x-camera.x)/20
      camera.y -= (mouseMapPos.y-camera.y)/20
    } else {
      camera.zoom += zoom
      camera.x += (mouseMapPos.x-camera.x)/20
      camera.y += (mouseMapPos.y-camera.y)/20
    }

    if(camera.zoom < 0.3) {
      options.clearScreen = false
      clearScreen()
    } else {
      options.clearScreen = true
    }
  })
    
  // moving loop
  setInterval(() => {
    moving()
  }, 10)
})

function moving() {
  let moved = false

  let speed = (1/camera.zoom)*10

  if(keys[87] || keys[38]) { // north
    camera.y -= speed
    moved = true
  }
  if(keys[68] || keys[39]) { // east
    camera.x += speed
    moved = true
  }
  if(keys[83] || keys[40]) { // south
    camera.y += speed
    moved = true
  }
  if(keys[65] || keys[37]) { // west
    camera.x -= speed
    moved = true
  }

  if(moved) {
    if(camera.zoom < 0.3) clearScreen()
  }

}