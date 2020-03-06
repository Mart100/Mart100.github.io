let selectedConnecton

$(() => {
  // keyboard
  $(document).on('keydown', (event) => { 
    keys[event.keyCode] = true

    // 1
    let mouseGridPos = world.grid.windowToGridPos(mouse.pos.x, mouse.pos.y)
    if(event.keyCode == 49) world.placeRandomConnectons({x:mouseGridPos.x,y:mouseGridPos.y}, settings.spawnTool.amount, settings.spawnTool.radius)

    // P
    if(event.keyCode == 80) world.isPaused = !world.isPaused
    if(world.isPaused) $('#pausedAlert').fadeIn()
    else $('#pausedAlert').fadeOut()
  })
  $(document).on('keyup',   (event) => { keys[event.keyCode] = false })

  // mouse move
  $('#canvas').on('mousemove', (event) => {
    mouse.pos.x = event.clientX
    mouse.pos.y = event.clientY
    displayTileInfo()
  })

  $('#connectoninfo').on('click', () => {
    let connecton = selectedConnecton
    if(connecton == undefined) return
    console.log(connecton)
  })

  $('#canvas').on('click', () => {
    let mouseGridPos = world.grid.windowToGridPos(mouse.pos.x, mouse.pos.y)
    selectedConnecton = undefined
    for(let connecton of world.connectons) {
      if(connecton.pos.x == mouseGridPos.x && connecton.pos.y == mouseGridPos.y) {
        selectedConnecton = connecton
        let offset = {
          x: world.grid.camera.pos.x-connecton.pos.x+world.grid.canvas1.width/2,
          y: world.grid.camera.pos.y-connecton.pos.y+world.grid.canvas1.height/2
        }
        world.grid.move(offset)
      }
    }
  })

  // listen for zooming
  $(document).on('DOMMouseScroll mousewheel', (event) => {

    let mouseGridPos = world.grid.windowToGridPos(event.clientX, event.clientY)
    // zoom out
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      world.grid.zoom(0.1, mouseGridPos)
    } else {
      world.grid.zoom(-0.1, mouseGridPos)
    }
  })
})