class InfoPanel {
  constructor() {
    $('body').prepend(`<div id="infoPanel"></div>`)
    let style = {
      'position': 'absolute', 
      'height': 'auto', 
      'width': 'auto', 
      'background-color': 'rgba(0, 0, 0, 0.4)', 
      'user-select': 'none', 
      'color': 'white',
      'padding': '5px',
      'pointer-events': 'none',
      'font-weight': 'bold'
    }
    $('#infoPanel').css(style)
  }

  add(name, value) {
    // if name not in infoPanel. Add it 
    if($(`#infoPanel #DP-${name}`)[0] == undefined) {
      $(`#infoPanel`).append(`<span id="DP-${name}"><br></span>`)
    }

    // format value
    if(typeof value != 'number' && typeof value != 'string') value = JSON.stringify(value)
    // update value
    $(`#infoPanel #DP-${name}`).html(name+': '+value+'<br>')
  }
}