$(() => {

  // walls
  $('#rightWall').change(() => { settings.walls.right = this.checked })
  $('#leftWall').change(() => { settings.walls.left = this.checked })

  // process settings
  $('#setInterval').change(() => { 
    clearInterval(process)
    process = setInterval(() => { for(let i=0; i<settings.loopAmount; i++) tick() }, $('#setInterval').val())
  })
    // process settings
  $('#loopAmount').change(() => { settings.loopAmount = $('#loopAmount').val() })



})


function pause() {
  if(isPaused) {
    isPaused = false
    $('#buttonPAUSE').html('Pause')
  } else {
    isPaused = true
    $('#buttonPAUSE').html('Unpause')
  }
  
}