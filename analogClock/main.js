let canvas, ctx
let time = {s: 0, m: 0, h: 0}
let size = 100
if(window.innerHeight < window.innerWidth) size = window.innerHeight/3
else size = window.innerWidth/3

let settings = {
    romanNumbers: {
        show: true,
    },
    extraOuterCircle: true,
    pointers: {
        seconds: {
            show: true,
            thick: size/70,
            length: size/1.03,
            color: 'black', // color
            lineCap: 'butt', // butt || round
            smoothAnimation: 'ease', // ease || linear || none
        },
        minutes: {
            show: true,
            thick: size/35,
            length: size/1.1,
            color: 'black',
            lineCap: 'butt',
        },
        hours: {
            show: true,
            thick: size/20,
            length: size/1.8,
            color: 'black',
            lineCap: 'butt',
        },
    },
    backgroundInnerLayer: 'rgba(255, 255, 255, 0.2)', // rgba code
}

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
