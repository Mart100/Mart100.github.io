let canvas, ctx
let objects = []
let objectAmount = 50
let mouse = {
  pos: new Vector2D()
}


$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  frame()
  setInterval(() => { tick() }, 10)
  createWorld()
  
})

// create random world
function createWorld() {
  for(let i=0;i<objectAmount;i++) {
    let pos1 = new Vector2D(Math.random()*canvas.width, Math.random()*canvas.height)
    let pos2 = pos1.clone().plus(new Vector2D((Math.random()*200)-100, (Math.random()*200)-100))
    let rect = new Rect(pos1, pos2)
    rect.rotate(Math.random()*360)
      
    objects.push(rect)
  }
}

// mouse listener
$(() => {
  $('canvas').on('mousemove', (event) => {
    mouse.pos.x = event.pageX
    mouse.pos.y = event.pageY
  })
})