// Start when page is loaded
$(function() {
  start()
  KeyEvents()
})
// Create Variables
let Snakepos = ['5-10','5-11','5-12','5-13','6-13','6-14']
const Game = {'keys': {} }
const Snake = {
  'movingdirection': 'right',
  'grow': false,
  move() {
    Snake.checkCollision()
    if(!Snake.grow) Snakepos.shift()
    Snake.grow = false
    // right
    if((Game.keys[68] || Game.keys[39]) && Snake.movingdirection != 'left') MoveTo('right')
    // left
    else if((Game.keys[65] || Game.keys[37]) && Snake.movingdirection != 'right') MoveTo('left')
    // up
    else if((Game.keys[87] || Game.keys[38]) && Snake.movingdirection != 'down') MoveTo('up')
    // down
    else if((Game.keys[83] || Game.keys[40]) && Snake.movingdirection != 'up') MoveTo('down')
    else MoveTo(Snake.movingdirection)
    function MoveTo(direction) {
      let FSPx = parseInt(Snakepos[Snakepos.length - 1].split('-')[1])
      let FSPy = parseInt(Snakepos[Snakepos.length - 1].split('-')[0])
      switch(direction) {
        case('left'):
          Snakepos.push((FSPy)+'-'+(FSPx-1))
          Snake.movingdirection = 'left'
          break
        case('right'):
          Snakepos.push((FSPy)+'-'+(FSPx+1))
          Snake.movingdirection = 'right'
          break
        case('up'):
          Snakepos.push((FSPy-1)+'-'+(FSPx))
          Snake.movingdirection = 'up'
          break
        case('down'):
          Snakepos.push((FSPy+1)+'-'+(FSPx))
          Snake.movingdirection = 'down'
          break
      }
    }
  },
  checkCollision() {
    // Check if double value
    if((new Set(Snakepos)).size !== Snakepos.length) $('.block').remove()
    for(let i = 0; i < Snakepos.length; i++) {
      // Check for walls
      if(Snakepos[i].includes('--1')) $('.block').remove()
      if(Snakepos[i].includes('20')) $('.block').remove()
      if(Snakepos[i].includes(Apple.pos)) {
        Apple.new()
        Snake.grow = true
      }
    }
  }
}
const Apple = {
  'pos': '',
  new() {
    let x = Math.round(Math.random() * 19)
    let y = Math.round(Math.random() * 19)
    Apple.pos = y+'-'+x
  }
}
// Functions
function start() {
  // Create Small block Div's
  for(i = 0; i < 480; i += 24) {
    for(ii = 0; ii < 480; ii += 24) {
      $('.block').append(`<div class="pixelDIV" id="${i/24}-${ii/24}"style="top: ${i}; left: ${ii}"></div>`)
    }
  }
  setInterval(function() { Snake.move() }, 200)
  setInterval(function() { paint() }, 100)
  Apple.new()

}
function KeyEvents() {
  $(document).keyup(function(event) { Game.keys[event.keyCode] = false })
  $(document).keydown(function(event) { Game.keys[event.keyCode] = true })
}
function paint() {
  for(i = 0; i < 20; i++) {
    for(ii = 0; ii < 20; ii++) {
      if(Snakepos.includes(i+'-'+ii)) $('#'+i+'-'+ii).css({ 'background-color': 'green'})
      else if(Apple.pos == (i+'-'+ii)) $('#'+i+'-'+ii).css({ 'background-color': 'red'})
      else $('#'+i+'-'+ii).css({ 'background-color': 'white'})
    }
  }
}
