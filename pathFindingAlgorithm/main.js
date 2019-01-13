let canvas, ctx
let screen = {width: window.innerWidth, height: window.innerHeight}
let input = {mouse: {down: {1: false, 3: false}, pos: {x: 0, y: 0}}}
let pixels = []
let distanceGrid = []
let highestDistance = 1000
let drawing = {lines: [], size: 10, line: {start: {x: 0, y: 0}, show: false}}
let drawSpeed = 0
let tickInterval
let images = {}
let algorithm = {
    population: [],
    currentMove: 0,
    populationSize: 0,
    generation: 0,
    averageFitness: 2000,
    totalMoves: 400,
    plusMovesPerGen: 10,
    finishPos: {},
    history: [],
    startTime: 0,
    topDistance: 0,
    rates: {
        best: 0,
        mutation: 0,
        crossover: 0,
        random: 0,
    }
}
let settings = {
    window: {
        drag: false, 
        offset: {x: 0, y: 0}
    },
    view: {
        hideEverything: false,
        showFitnessGrid: false,
        cubeTrans: 1,
        cubeStroke: true,
        viewFirst: false
    },
    algorithm: {
        skipCollision: false
    }
}
let phase = 'drawing'

// create border lines
drawing.lines.push({start: {x: 12.5, y: window.innerHeight}, end: {x: 12.5, y: 0}, width: 25}) // left
drawing.lines.push({start: {x: window.innerWidth-12.5, y: window.innerHeight}, end: {x: window.innerWidth-12.5, y: 0}, width: 25}) // right
drawing.lines.push({start: {x: 0, y: 12.5}, end: {x: window.innerWidth, y: 12.5}, width: 25}) // top
drawing.lines.push({start: {x: 0, y: window.innerHeight-12.5}, end: {x: window.innerWidth, y: window.innerHeight-12.5}, width: 25}) // bottom


$(function() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  algorithm.finishPos = {x: canvas.width-100, y: canvas.height-100}
  window.requestAnimationFrame(frame)
  tickInterval = setInterval(() => { tick() }, 1)

  // prevent right click
  document.addEventListener('contextmenu', e => e.preventDefault());

  // On next button
  $('#nextButton').on('click', () => {
      nextPhase('settings')
  })

})

function changeSimulationSpeed(speed) {
    clearInterval(tickInterval)
    tickInterval = setInterval(() => { tick() }, speed)
}