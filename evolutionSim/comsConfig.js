// declare variables
let coms = new ComsConsole()

// add commands


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