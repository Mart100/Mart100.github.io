class ComsConsole {
  constructor() {
    this.commandHistory = []
    this.commands = {}
    this.commandHistoryAt = 0

    window.addEventListener("load", () => { this.create() })
  }
  create() {
    console.log(this)
    this.createHTML()
    this.createCSS()

    this.keyListener()
    this.mouseListener()

    this.createDefaultCommands()
  }
  createHTML() {
    $('body').append(`
      <div id="ComsConsole">
        <div id="ComsConsole-output">Type <span class="markdown">help</span> to begin!<br></div>
      </div>
      <span id="ComsConsole-autosuggest"></span>
      <input id="ComsConsole-input" type="text">
    `)
  }
  createCSS() {
    $('head').append(`
      <style>
      #ComsConsole {
        position: absolute;
        top: 0px;
        right: 0px;
        background-color: black;
        color: #00ff00;
        border-radius: 0px 0px 0px 5px;
        transition-duration: .2s;
        width: 100px;
        height: 20px;
        cursor: pointer;
        font-family: monospace;
        padding: 10;
      }

      #ComsConsole-output {
        display: none;
      }
      #ComsConsole.expanded {
        cursor: default;
        height: 924;
        width: 300px;
      }
      #ComsConsole.expanded #output {
        height: 97%;
        overflow-x: hidden;
        overflow-y: auto;
      }
      #ComsConsole-input {
        position: absolute;
        display: none;
        box-sizing: border-box;
        bottom: 5px;
        width: 300px;
        right: 5px;
        line-height: 18px;
        padding: 1px;
        height: 20px;
        font-size: 15px;
        color: #00af00;
        background-color: transparent;
        border: none;
        font-family: monospace;

      }
      #ComsConsole-autosuggest {
        position: absolute;
        box-sizing: border-box;
        bottom: 5px;
        width: 300px;
        height: 20px;
        line-height: 18px;
        padding: 1px;
        right: 5px;
        font-size: 15px;
        color: #005300;
        border: none;
        font-family: monospace;

      }
      #ComsConsole:hover:not(.expanded) {
        width: 110px;
        height: 30px;
      }
      #ComsConsole .markdown {
        color: #029102;
      }
      </style>
    `)
  }
  createDefaultCommands() {
    // close
    Coms.addCommand(new ComsCommand(Coms, 'close', 'none', () => { return this.close() }))

    // clear
    Coms.addCommand(new ComsCommand(Coms, 'clear', 'none', () => { return this.clear() }))

    // help
    Coms.addCommand(new ComsCommand(Coms, 'help', 'none', () => { return this.help() }))
  }
  mouseListener() {
    $('#ComsConsole').on('click', this.expandConsole)
  }
  keyListener() {
    $('#ComsConsole-input').on('keydown', (event) => {
      if(event.key == 'Enter') this.enterConsole()
      if(event.key == 'Tab') {
        event.preventDefault()
        this.applySuggestion()
      }
      if(event.key == 'ArrowUp') {
        if(this.commandHistoryAt > 0) this.commandHistoryAt--
        $('#ComsConsole-input').val(this.commandHistory[commandHistoryAt])
      }
      if(event.key == 'ArrowDown') {
        if(this.commandHistoryAt < this.commandHistory.length) this.commandHistoryAt++
        $('#ComsConsole-input').val(this.commandHistory[commandHistoryAt])
      }
      setTimeout(this.autoSuggest, 100)
    })
  }

  expandConsole() {
    $('#ComsConsole-output').show()
    $('#ComsConsole').addClass('expanded')
    setTimeout(() => { 
      $('#ComsConsole-input').show()
      $('#ComsConsole-input').focus()
    }, 200)
  }

  autoSuggest() {
    let input = $('#ComsConsole-input').val()
    let args = input.toLowerCase().split(' ')
    let t = this.commands
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

    if(sugi != finishedArgs.length) return $('#ComsConsole-autosuggest').html('')

    let suggestText = finishedArgs.join(' ')+' '+sugg

    $('#ComsConsole-autosuggest').html(suggestText)
  }
  shrinkConsole() {
    $('#ComsConsole').removeClass('expanded')
    $('#ComsConsole-input').hide()
    setTimeout(() => { $('#ComsConsole-output').hide() }, 200)
  }
  enterConsole() {
    let input = $('#ComsConsole-input').val()
    $('#ComsConsole-input').val('')
    $('#ComsConsole-output').append(`<span style="color:#00af00;">> ${input}</span><br>`)
    this.consoleCommand(input)
    $('#ComsConsole-output').scrollTop($('#ComsConsole-output').height())
    this.commandHistory.push(input)
    this.commandHistoryAt = this.commandHistory.length
  }
  appendOutput(html) {
    html = html.replace(new RegExp('\\[', 'g'), '<span class="markdown">')
    html = html.replace(new RegExp(']', 'g'), '</span>')
    $('#ComsConsole-output').append(html+'<br><br>')
  }
  applySuggestion() {
    $('#ComsConsole-input').val($('#ComsConsole-autosuggest').html().trim())
    setTimeout(() => { $('#ComsConsole-input').focus() }, 1000)
  }
  addCommand(command) {
    this.commands[command.name] = command
  }
  consoleCommand(input) {
    let args = input.toLowerCase().split(' ')
    if(args.length == 1) args.push('')
    let lastArg = args.pop()
    let command = this.getCommand(args)

    if(command == undefined) { 
      // undefined command
      this.appendOutput('Command not found :(<br>Try [help] to get a list of commands')
    }

    // else run command
    else {
      console.log(command)
      command.run(lastArg)
    }

  }
  getCommand(list) {

    if(list.length == 0) return

    let command = this.commands
    for(let i=0;i<list.length;i++) {
      // get subcommand
      if(i == 0) command = command[list[i]]
      else command = command.subcommands[list[i]]

      if(command == undefined) return
    }
    return command
  }
  inConsole() {
    return $('#ComsConsole-input').is(':focus')
  }
  clear() {
    $('#ComsConsole-output').html('')
    return 'Cleared console!'
  }
  close() {
    this.shrinkConsole()
    return 'Console closed!'
  }
  help() {
    let html = 'List of commands:<br>'

    for(let command in this.commands) {
      html += `-[${command}]<br>`
    }

    return html
  }

}

class ComsCommand {
  constructor(cc, name, type, code) {
    this.subcommands = {}
    this.type = type
    if(this.type == undefined) this.type = 'none'
    this.name = name
    this.code = code
    this.ComsConsole = cc
  }
  run(arg) {
    let result
    // type is number
    if(this.type == 'number') {
      let num = Number(arg)
      if(isNaN(num)) {
        this.ComsConsole.appendOutput(`ERR: ${arg} is not a number!`)
        return
      }
      result = num
    }
    
    // type is boolean
    else if(this.type == 'boolean') {
      let bool
      if(arg == 'false') bool = false
      else if(arg == 'true') bool = true
      else {
        this.ComsConsole.appendOutput(`ERR: ${arg} is not true/false!`)
        return
      }
      result = bool
    }
    else result = arg
    
    let codeReturnMsg = this.code(result)
    if(codeReturnMsg != undefined) this.ComsConsole.appendOutput(codeReturnMsg)
    else this.ComsConsole.appendOutput('Succeeded')

  }
  addSubCommand(command) {
    this.subcommands[command.name] = command
  }
}