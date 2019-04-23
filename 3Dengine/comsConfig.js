// declare variables
let coms = new ComsConsole()

// add commands


// fly
coms.addCommand('fly', 'boolean', {}, (bool) => {
  settings.fly = bool
  if(bool) return 'Fly enabled'
  else return 'Fly disabled'
})