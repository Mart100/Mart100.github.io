// Start when page is loaded
$(function() {
  start()
  KeyEvents()
})
// Create Variables
let Move
let LastKey
const Snake = {
  'movedirection': 'right',
  'grow': false,
  'pos': ['5-5','5-6','5-7'],
  move() {
    Snake.checkCollision()
    if(!Snake.grow) Snake.pos.shift()
    Snake.grow = false
    // right
    if((LastKey == 68 || LastKey == 39) && Snake.movedirection != 'left') MoveTo('right')
    // left
    else if((LastKey == 65 || LastKey == 37) && Snake.movedirection != 'right') MoveTo('left')
    // up
    else if((LastKey == 87 || LastKey == 38) && Snake.movedirection != 'down') MoveTo('up')
    // down
    else if((LastKey == 83 || LastKey == 40) && Snake.movedirection != 'up') MoveTo('down')
    else MoveTo(Snake.movedirection)
    paint()
    function MoveTo(direction) {
      let FSPx = parseInt(Snake.pos[Snake.pos.length - 1].split('-')[1])
      let FSPy = parseInt(Snake.pos[Snake.pos.length - 1].split('-')[0])
      switch(direction) {
        case('left'):
          Snake.pos.push((FSPy)+'-'+(FSPx-1))
          Snake.movedirection = 'left'
          break
        case('right'):
          Snake.pos.push((FSPy)+'-'+(FSPx+1))
          Snake.movedirection = 'right'
          break
        case('up'):
          Snake.pos.push((FSPy-1)+'-'+(FSPx))
          Snake.movedirection = 'up'
          break
        case('down'):
          Snake.pos.push((FSPy+1)+'-'+(FSPx))
          Snake.movedirection = 'down'
          break
      }
    }
  },
  checkCollision() {
    // Check if double value
    if((new Set(Snake.pos)).size !== Snake.pos.length) GameOver()
    for(let i = 0; i < Snake.pos.length; i++) {
      // Check for walls
      if(Snake.pos[i].replace(/[^-]/g, "").length > 1) GameOver()
      if(Snake.pos[i].includes('20')) GameOver()
      if(Snake.pos[i].includes(Apple.pos)) {
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
    paint()
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
  Move = setInterval(function() { Snake.move() }, 100)
  Apple.new()

}
function GameOver() {
  clearInterval(Move)
  $('.block').animate({opacity: '0.2'}, 1000)
  $('body').append(`<div class="GameOver"> <span>Game Over</span> <div class="Score">Score: ${Snake.pos.length}</div> <div class="Restart">Restart</div> </div>`)
  $('.Restart').on('click', () => Restart())
}
function Restart() {
  $('.block').animate({opacity: '1'}, 500)
  $('.block *').remove()
  $('.GameOver').remove()
  $('.Restart').off('click')
  Snake.pos = ['5-5','5-6','5-7']
  Snake.movedirection = 'right'
  start()
}
function KeyEvents() {
  $(document).keydown(function(event) { LastKey = event.keyCode})
}
function paint() {
  for(i = 0; i < 20; i++) {
    for(ii = 0; ii < 20; ii++) {
      if(Snake.pos.includes(i+'-'+ii)) $('#'+i+'-'+ii).css({ 'background-color': 'green'})
      else if(Apple.pos == (i+'-'+ii)) $('#'+i+'-'+ii).css({ 'background-color': 'red'})
      else $('#'+i+'-'+ii).css({ 'background-color': 'white'})
    }
  }
}
