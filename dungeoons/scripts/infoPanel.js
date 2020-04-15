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
    if(typeof value == 'number') value = value.toFixed(3)

    // format value
    if(typeof value == 'object') {
      value = JSON.parse(JSON.stringify(value))
      for(let key in value) {
        if(typeof value[key] == 'number') value[key] = value[key].toFixed(3)
      }
      value = JSON.stringify(value)
    }
    
    // update value
    $(`#infoPanel #DP-${name}`).html(name+': '+value+'<br>')
  }
}