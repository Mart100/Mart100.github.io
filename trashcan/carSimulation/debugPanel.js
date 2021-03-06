class DebugPanel {
  constructor() {
    $('body').prepend(`<div id="debugPanel"></div>`)
    let style = {
      'position': 'absolute', 
      'height': 'auto', 
      'width': 'auto', 
      'background-color': 'rgba(0, 0, 0, 0.4)', 
      'user-select': 'none', 
      'color': 'white',
      'padding': '5px',
      'pointer-events': 'none'
    }
    $('#debugPanel').css(style)
  }

  add(name, value) {
    // if name not in debugPanel. Add it 
    if($(`#debugPanel #DP-${name}`)[0] == undefined) {
      $(`#debugPanel`).append(`<span id="DP-${name}"><br></span>`)
    }

    // format value
    if(typeof value != 'number' && typeof value != 'string') value = JSON.stringify(value)
    // update value
    $(`#debugPanel #DP-${name}`).html(name+': '+value+'<br>')
  }
  ping(name) {
    // if name not in debugPanel. Add it 
    if($(`#debugPanel #DP-${name}`)[0] == undefined) $(`#debugPanel`).append(`<span name="${new Date().getTime()}" id="DP-${name}"><br></span><br>`)

    // update value
    let lastDate = Number($(`#debugPanel #DP-${name}`).attr('name'))

    $(`#debugPanel #DP-${name}`).html(name+( Math.random() > 0.5 ? ':  ' : ';  ')+(new Date().getTime() - lastDate)+'<br>')
    $(`#debugPanel #DP-${name}`).attr('name', new Date().getTime())
  }
  remove(name) {
    if($(`#debugPanel #DP-${name}`) == undefined) return
    $(`#debugPanel #DP-${name}`).remove()
  }
}