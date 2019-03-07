let commandHistory = []
let commandHistoryAt = 0

$(() => {
  $('#console-input').val('')
  $('#console').on('click', expandConsole)
  $('#console-input').on('keydown', (event) => {
    if(event.key == 'Enter') enterConsole()
    console.log(event.key)
    if(event.key == 'Tab') {
      event.preventDefault()
      applySuggestion()
    }
    if(event.key == 'ArrowUp') {
      if(commandHistoryAt > 0) commandHistoryAt--
      $('#console-input').val(commandHistory[commandHistoryAt])
    }
    if(event.key == 'ArrowDown') {
      if(commandHistoryAt < commandHistory.length) commandHistoryAt++
      $('#console-input').val(commandHistory[commandHistoryAt])
    }
    setTimeout(autoSuggest, 100)
  })
})

function autoSuggest() {
  let input = $('#console-input').val()
  console.log(input)
  let args = input.toLowerCase().split(' ')
  let t = suggestions
  let sugg = ''
  let sugi = 0
  for(let i=0;i<args.length; i++) {
    for(let sug in t) {
      if(args[i].length == 0) continue
      if(sug.startsWith(args[i])) {
        if(t[sug] == undefined) continue
        t = t[sug]
        sugg = sug
        sugi = i
      }
    }
  }


  let finishedArgs = args
  finishedArgs.pop()

  console.log(sugi, finishedArgs.length)
  if(sugi != finishedArgs.length) return $('#console-autosuggest').html('')

  let suggestText = finishedArgs.join(' ')+' '+sugg

  console.log(sugg, finishedArgs, sugi)
  $('#console-autosuggest').html(suggestText)
}

function applySuggestion() {
  $('#console-input').val($('#console-autosuggest').html().trim())
  setTimeout(() => { $('#console-input').focus() }, 1000)
}
const suggestions = {
  'drawskips': {
    'view': {'true': {}, 'false': {} },
    'strength': {},
    'false': {},
    'true': {}
  },
  'pixelated': {'false': {}, 'true': {}},
  'clear': {},
  'reset': {},
  'seed': {},
  'help': {},
  'detail': {},
  'speed': {},
  'time': {
    'speed': {},
    'false': {},
    'true': {}
  }
}

function expandConsole() {
  $('#console #output').show()
  $('#console').addClass('expanded')
  setTimeout(() => { 
    $('#console-input').show()
    $('#console-input').focus()
  }, 200)
}

function shrinkConsole() {
  $('#console').removeClass('expanded')
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
  commandHistory.push(input)
  commandHistoryAt = commandHistory.length
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
  drawskips(args) {
    if(args[0] == 'strength') {
      let num = Number(args[1])
      if(isNaN(num)) return appendOutput('ERR: Must be a number')
      settings.drawSkips.strength = num
      appendOutput(`drawSkip strength set to [${num}]`)
    }
    else if(args[0] == 'view') {
      let k = false
      if(args[1] == 'false') {
        k = false
        appendOutput(`drawSkip view Disabled!`)
      }
      else if(args[1] == 'true') {
        k = true
        appendOutput(`drawSkip view Enabled!`)
      }
      else {
        appendOutput(`ERR: Must be true/false`)
      }
      settings.drawSkips.view = k
    }
    else if(args[0] == 'false') {
      settings.drawSkips.enabled = false
      appendOutput('drawSkips disabled!')
    }
    else if(args[0] == 'true') {
      settings.drawSkips.enabled = true
      appendOutput('drawSkips enabled!')
    } else {
      appendOutput(`
      -drawskips [strength <num>]    <br>
      -drawskips [view <true/false>] <br>
      -drawskips [<true/false>]      <br>
      `)
    }
  },
  time(args) {
    if(args[0] == 'speed') {
      let num = Number(args[1])
      if(isNaN(num)) return appendOutput('ERR: Must be a number')
      settings.timeSpeed = num
    }
    else if(args[0] == 'false') {
      settings.timeEnabled = false
      appendOutput('Time disabled!')
    }
    else if(args[0] == 'true') {
      settings.timeEnabled = true
      appendOutput('Time enabled!')
    } else {
            appendOutput(`
      -time [speed <num>]    <br>
      -time [<true/false>]<br>
      `)
    }
  },
  help(args) {
    appendOutput(`
    List of commands: <br>
    -[reset]<br>
    -[seed]<br>
    -[clear]<br>
    -[close]<br>
    -[speed <1-100> ]<br>
    -[pixelated] <true/false><br>
    -[detail <1-100>]<br>
    -[drawskips]<br>
    -[time]<br>
    `)
  }

}