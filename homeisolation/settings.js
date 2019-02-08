$(() => {
  pauseButton()
  outsideTempInput()
  houseTempInput()
  factorInput()
  timeSpeedInput()
})

function pauseButton() {
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
}

function houseTempInput() {
  $('#houseTemp').on('change', () => {
    houseTemp = $('#houseTemp').val()
  })
}

function outsideTempInput() {
  $('#outsideTemp').on('change', () => {
    outsideTemp = $('#outsideTemp').val()
  })
}

function timeSpeedInput() {
  $('#timeSpeed').on('change', () => {
    speed = Number($('#timeSpeed').val())
  })
}

function factorInput() {
  $('#factor').on('change', () => {
    factor = $('#factor').val()
  })
}
