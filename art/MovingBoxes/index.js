let canvas, ctx
let boxes = []
let colors = []
let bgc

$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  for(let i=0;i<5;i++) colors.push(getRandomColor())

  bgc = getRandomColor()
  $('body').css('background-color', `rgb(${bgc[0]}, ${bgc[1]}, ${bgc[2]})`)


  createBoxes()

  frame()
  setInterval(() => { tick() }, 20)
})



function createBoxes() {
  for(let i=0;i<500;i++) {
    let b = new Box()
    
    b.position.x = Math.random()*canvas.width
    b.position.y = Math.round(Math.random()*canvas.height/50)*50

    b.z = Math.random()*100

    b.velocity.x = (Math.random()-0.5)*b.z/20

    //b.velocity.y = (Math.random()-0.5)

    b.size.x = Math.round((Math.random()-0.5)*100)*20
    b.size.y = (Math.random()-0.5)*400

    if(b.size.x < 300) b.size.x = 300
    if(b.size.y < 100) b.size.y = 100

    b.color = colors[Math.floor(Math.random()*colors.length)]

    b.opacity = 1





    boxes.push(b)
  }
}

function getRandomColor() {
  let color = []
  color[0] = Math.random()*255
  color[1] = Math.random()*255
  color[2] = Math.random()*255
  return color
}

class Box {
  constructor() {

    this.z = 0
    this.position = new Vec2()
    this.velocity = new Vec2()
    this.size = new Vec2()
    this.color = [0, 0, 0]
    this.opacity = 0

  }
}