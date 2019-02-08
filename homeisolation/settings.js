$(() => {
  $('#pause').on('click', () => {
    // if not paused
    if($('#pause').html() == 'Pause') {
      $('#pause').html('Continue')
      isPaused = true

    }
    // if paused
    else if($('#pause').html() == 'Continue') {
      $('#pause').html('Pause')
      isPaused = false
    }
  })
})
