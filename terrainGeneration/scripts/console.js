$(() => {
  $('#console-input').val('')
  $('#console').on('click', expandConsole)
  $('#console-input').on('keydown', (event) => { if(event.key == 'Enter') enterConsole() })
})

function expandConsole() {
  $('#console #output').show()
  $('#console').addClass('expanded')
  setTimeout(() => { 
    $('#console-input').show()
    $('#console-input').focus()
  }, 200)
}

function fullscreenConsole() {
  $('#console').addClass('fullscreen')
}

function shrinkConsole() {
  $('#console').removeClass('expanded')
  $('#console').removeClass('fullscreen')
  $('#console-input').hide()
  setTimeout(() => { $('#console #output').hide() }, 200)
}

function appendOutput(html) {
  html = html.replace(new RegExp('\\[', 'g'), '<span class="markdown">')
  html = html.replace(new RegExp(']', 'g'), '</span>')
  $('#console #output').append(html+'<br><br>')
}

function enterConsole() {
  let input = $('#console-input').val()
  $('#console-input').val('')
  $('#console #output').append(`<span style="color:#00af00;">> ${input}</span><br>`)
  consoleCommand(input)
  $('#console #output').scrollTop($('#console #output').height())
}

function consoleCommand(input) {
  let args = input.toLowerCase().split(' ')
  let command = args[0]
  args.shift()

  if(commands[command] == undefined) {
    // undefined command
    appendOutput('Command not found :(<br>Try [help] to get a list of commands')
  }

  // else run command
  else {
    commands[command](args)
  }

}

function inConsole() {
  return $('#console-input').is(':focus')
}

const commands = {

  reset(args) {
    resetWorld()
    appendOutput('Resetted the world!')
  },

  seed(args) {
    // if no arguments. return seed
    if(args[0] == undefined) {
      appendOutput(`Current Seed: [${mainSeed}]<br> Use [seed <0-1>] to change the seed.`)
    }
    // if argument. Set seed
    else {
      let oldSeed = mainSeed
      let newSeed = Number(args[0])

      // check if seed is viable
      if(newSeed > 1 || newSeed < 0) return appendOutput('ERR: Seed must be between 0 and 1')
      if(isNaN(newSeed)) return appendOutput('ERR: Seed must be a number')
      mainSeed = newSeed

      appendOutput(`Set old seed ([${oldSeed}]) to new seed ([${newSeed}]) <br>Use [reset] to reset the world.`)
    }
  },

  fullscreen(args) {
    fullscreenConsole()
    appendOutput('Fullscreen!')
  },

  clear(args) {
    $('#console #output').html('')
    appendOutput('Cleared closed!')
  },

  close(args) {
    shrinkConsole()
    appendOutput('Console closed!')
  },

  speed(args) {
    let oldSpeed = camera.speed
    let newSpeed = Number(args[0])
    if(isNaN(newSpeed)) return appendOutput('ERR: Speed must be a number')
    camera.speed = newSpeed
    appendOutput(`Set speed from [(${oldSpeed})] to [(${newSpeed})]`)


  },

  pixelated(args) {
    let pix = args[0]
    if(pix != 'false' && pix != 'true') return appendOutput(`Please enter [true] or [false]`)
    if(pix == 'true') pix = true
    if(pix == 'false') pix = false
    settings.pixelated = pix
    appendOutput(`Set pixelated to [${pix}]`)
  },

  detail(args) {
    let num = Number(args[0])
    if(isNaN(num)) return appendOutput('ERR: Must be a number')
    settings.detail = num
    appendOutput(`Detail set to [${num}]`)
  },

  help(args) {
    appendOutput(`
    
    `)
  }

}