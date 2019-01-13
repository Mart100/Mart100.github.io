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
    // update value
    $(`#debugPanel #DP-${name}`).html(name+': '+value)
  }
}