let canvas, ctx
let time = {s: 0, m: 0, h: 0}
let size = 100
if(window.innerHeight < window.innerWidth) size = window.innerWidth/5
else size = window.innerHeight/5

var background = new Image()
background.src = "https://i.imgur.com/ecPf0J8.jpg"


$(function() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.translate(canvas.width/2+0.5, canvas.height/2+0.5)
  setInterval(() => { frame() }, 10)

  
  // update time
  setInterval(() => {
    let date = new Date()
    time.ms = date.getMilliseconds()
    time.s = date.getSeconds()
    time.m = date.getMinutes()
    time.h = date.getHours()
  }, 1)
})
