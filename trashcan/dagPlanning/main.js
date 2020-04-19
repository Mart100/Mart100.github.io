$(() => {
  start()
})

async function start() {

  // prepare canvas
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // calling start functions
  givePlanningColors()
  frame()
}

function givePlanningColors() {
  for(let activity of planning) activity.color = randomColor()
}

function randomColor() {
  let r = Math.floor(Math.random()*255)
  let g = Math.floor(Math.random()*255)
  let b = Math.floor(Math.random()*255)
  return [r, g, b]
}

function timeParser(str) {
  let split = str.split(':')
  let hours = Number(split[0])
  let minutes = Number(split[1])
  let totalMinutes = minutes + (hours*60)
  return totalMinutes
}

function r(c) { 
  return (Math.random()*10 > c)
}