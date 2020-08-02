class DebugPanel {
  constructor() {
    $('body').prepend(`<div id="debugPanel"></div>`)
    $('#debugPanel').css({'position': 'absolute', 'height': 'auto', 'width': 'auto', 'background-color': 'rgba(0, 0, 0, 0.2)', 'user-select': 'none'})
  }

  add(name, value) {
    // if name not in debugPanel. Add it 
    if($(`#debugPanel #DP-${name}`)[0] == undefined) {
      $(`#debugPanel`).append(`<span id="DP-${name}"></span><br>`)
    }

    // format value
    if(typeof value != 'number' && typeof value != 'string') value = JSON.stringify(value)
    // update value
    $(`#debugPanel #DP-${name}`).html(name+': '+value)
  }
  ping(name) {
    // if name not in debugPanel. Add it 
    if($(`#debugPanel #DP-${name}`)[0] == undefined) $(`#debugPanel`).append(`<span name="${new Date().getTime()}" id="DP-${name}"></span><br>`)

    // update value
    let lastDate = Number($(`#debugPanel #DP-${name}`).attr('name'))

    $(`#debugPanel #DP-${name}`).html(name+( Math.random() > 0.5 ? ':  ' : ';  ')+(new Date().getTime() - lastDate))
    $(`#debugPanel #DP-${name}`).attr('name', new Date().getTime())
  }
}