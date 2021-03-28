console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function(){
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
}

$(() => {
  let compiled = ''
  $('#run').on('click', async () => {

    compiled = ''

    // open dext file
    let dext = $('#input').val()

    // loop trough lines
    let lines = dext.split('\n')
    for(let line of lines) compiled += compileLine(line)

    // replace console logs with

    // run program
    console.logs.length = 0

    eval(compiled)
    output = console.logs.join('\n')


    // write output
    $('#output').val(output)
  })

  $('#seeCompiled').on('click', () => {
    $('body').append(`<div id="compiledOutput"><div>CLICK HERE TO CLOES THIS WINDOW!</div><textarea>${compiled}</textarea></div>`)
    $('#compiledOutput div').off().on('click', () => {
      $('#compiledOutput').remove()
    })
  })

  $('#getExample').on('click', () => {
    let exampleDext = getExampleDext()
    $('#input').val(exampleDext)
  })
})
