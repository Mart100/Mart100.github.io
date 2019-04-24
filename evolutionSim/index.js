let canvas, ctx
let cells = {}
let foods = []


$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  debugPanel = new DebugPanel
  debugPanel.textColor('#FFFFFF')

  startCells()
  frame()
  setInterval(() => { tick() }, 10)
})


function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomRGB() {
	return [randomRange(0, 255), randomRange(0, 255), randomRange(0, 255)]
}

function startCells() {
  for(let i=0;i<50;i++) {
    new Cell()
  }
}

function randomToken(length) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'
  let numbers = '1234567890'
  let token = ''

  for(let i=0;i<length;i++) {
    let char = ''
    if(Math.random() > 0.3) {
      char = alphabet[Math.floor(Math.random()*alphabet.length)]
      if(Math.random() > 0.5) char.toUpperCase()
    } else char = numbers[Math.floor(Math.random()*numbers.length)]
    token += char
  }
  return token

}

function findCell(sortfunc, cell, func) {
  let compatibleCells = []

  // see compatible
  for(let cellID in cells) {
    let cellL = cells[cellID]
    if(cellL.id == cell.id) continue
    if(func(cellL)) compatibleCells.push(cellL)
  }

  // sort
  if(sortfunc == 'distance') {
    compatibleCells.sort((a, b) => {
      let distanceA = a.pos.clone().minus(cell.pos)
      let distanceB = b.pos.clone().minus(cell.pos)
      return distanceB - distanceA
    })
  }
  
  return compatibleCells[0]
}

function crossover(cell1, cell0) {
  let genetics = {}

  genetics.pos = cell0.pos.clone()
  genetics.color = [((cell1.color[0]+cell0.color[0])/2), ((cell1.color[1]+cell0.color[1])/2), ((cell1.color[2]+cell0.color[2])/2)]
  genetics.brain = cell0.brain

  return genetics
}

function cellsFunc(func) {
  for(let cellID in cells) {
    let cell = cells[cellID]
    func(cell)
  }
}