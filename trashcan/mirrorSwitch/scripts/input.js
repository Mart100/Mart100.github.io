$(() => {
  // on click of game
  $(document).on('click', () => {
    if(inMenu) return
    // flip ball side
    if(ball.side == 'right') ball.side = 'left'
    else if(ball.side == 'left') ball.side = 'right'
  })

  // play button click
  $('#play').on('click', () => {
    play()
  })
})