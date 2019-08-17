function showLoadPopup() {
  let html = `
Your Mindmaps:
<div id="saves">

</div>
<br>
<span>Or load a save using the token:</span>
<input id="load-token-input" type="text"></input>

<br><button id="loadMap-button">Load Map</button>
  
`

  createPopup(html)

  let cookieSaves = getCookie('saves')
  if(cookieSaves == "") cookieSaves = []
  else cookieSaves = JSON.parse(cookieSaves)

  cookieSaves.sort((a, b) => b.date-a.date)

  for(let save of cookieSaves) {

    let date = new Date()
    date.setTime(save.date)
    let dateSegments = date.toString().split(' ')
    let dateString = dateSegments[4]+' '+dateSegments[1]+' '+dateSegments[2]+' '+dateSegments[3]

    let name = save.name
    if(name == undefined) name = save.token

    $('#saves').append(`
      <div class="save" id="save-${save.token}">
        <span class="name">${name}</span>
        <br>
        <span class="date">Date: ${dateString}</span>

        <div class="rename">Rename</div>
        <div class="delete">Delete</div>
      </div>
    `)
  }

  $('.save').on('click', (event) => {

    let token = event.target.id.replace('save-', '')

    $('#loadMap-button').fadeIn()
    $('#loadMap-button').html(`Load map: ${token}`)
  })

  $('.save .delete').on('click', (event) => {
    let token = event.target.parentNode.id.replace('save-', '')
    if(!confirm(`Are you sure you want to delete map ${token}?`)) return
    let newCookieSaves = cookieSaves.filter((s) => s.token != token)
    newCookieSaves = JSON.stringify(newCookieSaves)
    setCookie('saves', newCookieSaves)
    deletePopup()
    showLoadPopup()
  })

  $('.save .rename').on('click', (event) => {
    let token = event.target.parentNode.id.replace('save-', '')
    let newName = prompt(`New map name of ${token}:`, "");
    let newCookieSaves = JSON.parse(JSON.stringify(cookieSaves))
    newCookieSaves.find((s) => s.token == token).name = newName
    newCookieSaves = JSON.stringify(newCookieSaves)
    setCookie('saves', newCookieSaves)
    deletePopup()
    showLoadPopup()
  })

  $('#load-token-input').on('input', () => {
    
    let token = $('#load-token-input').val()
    
    $('#loadMap-button').fadeIn()
    $('#loadMap-button').html(`Load map: ${token}`)
  })

  $('#loadMap-button').on('click', () => {
    let token = $('#loadMap-button').html().replace('Load map: ', '')

    window.location = '?save='+token

  })
}