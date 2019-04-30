// declare variables
let coms = new ComsConsole()

// killall
coms.addCommand('killall', 'none', {}, () => {
  cells = {}
  return 'Killed all'
})

// randomcells
coms.addCommand('randomcells', 'number', {}, (num) => {
  if(num == 0) num = 50
  for(let i=0;i<num;i++) new Cell()
  return `Added ${num} random cells` 
})

// draw
coms.addCommand('draw', 'boolean', {}, (bool) => {
  settings.draw = bool
  if(bool) return 'Drawing enabled'
  else return 'Drawing disabled' 
})

// collision
coms.addCommand('collision', 'boolean', {}, (bool) => {
  settings.cellCollision = bool
  if(bool) return 'Cell to Cell collision enabled'
  else return 'Cell to Cell disabled' 
})

// average
coms.addCommand('average', 'none', {}, () => {
  let average = getCellAverage()

  return `
  speed: ${average.speed}
  `
})