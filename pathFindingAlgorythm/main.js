let canvas, ctx
let screen = {width: window.innerWidth, height: window.innerHeight}
let input = {mouse: {down: {1: false, 3: false}, pos: {x: 0, y: 0}}}
let inputLoop
let pixels
let drawing = {lines: [], size: 10, line: {start: {x: 0, y: 0}, show: false}}
let settings = { 
    algo: {
        population: 0,
    }, 
    window: {
        drag: false, 
        offset: {x: 0, y: 0}
    }
}
let phase = 'drawing'

// create border lines
drawing.lines.push({start: {x: 0, y: window.innerHeight}, end: {x: 0, y: 0}, width: 50}) // left
drawing.lines.push({start: {x: window.innerWidth, y: window.innerHeight}, end: {x: window.innerWidth, y: 0}, width: 50}) // right
drawing.lines.push({start: {x: 0, y: 0}, end: {x: window.innerWidth, y: 0}, width: 50}) // top
drawing.lines.push({start: {x: 0, y: window.innerHeight}, end: {x: window.innerWidth, y: window.innerHeight}, width: 50}) // bottom


$(function() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  window.requestAnimationFrame(frame)
  setInterval(() => { tick() }, 10)

  // prevent right click
  document.addEventListener('contextmenu', e => e.preventDefault());

  // On next button
  $('#nextButton').on('click', () => {
      nextPhase('settings')
  })

})