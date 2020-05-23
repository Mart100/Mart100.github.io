$(() => { loadT() })
let tournament

async function loadT() {
  let params = window.location.search.substr(1).split('&')
  let tournamentParam = params[0].replace('tournament=', '')
  let viewingParam
  if(params[1]) viewingParam = params[1].replace('viewing=', '')

  if(tournamentParam == "") return

  let tournaments = await getTournaments()

  tournament = Object.values(tournaments).find((t) => t.id == tournamentParam || t.name == tournamentParam)

  $('#tournaments').remove()
  $('body').append(`
    <div id="tournament">
      <div id="top">
        <img id="image" src="${tournament.image}" />
        <div id="name">${tournament.name}</div>
      </div>
      <div id="navT">
        <span id="overview" onclick="showOverview()">Overview</span>
        <span id="players" onclick="showPlayers()" >Players</span>
        <span id="brackets">Brackets</span>
      </div>
      <div id="bottom"></div>
    </div>
  `)

  // navT click
  $('#navT span').on('click', (event) => {
    $('#navT span').removeClass('selected')
    $(event.target).addClass('selected')
    $('#tournament').removeClass('showingBrackets')
    if(event.target.id == 'brackets') showBrackets()

  })

  if(viewingParam == 'brackets') showBrackets()
  else if(viewingParam == 'players') showPlayers()
  else if(viewingParam == 'overview') showOverview()
  else showOverview()
}

function showBrackets() {
  $('#brackets').addClass('selected')
  $('#tournament').addClass('showingBrackets')
  $('#bottom').html(`<iframe src="https://challonge.com/${tournament.name}/module"></iframe>`)
}

function showPlayers() {
  $('#players').addClass('selected')
  $('#bottom').html('')
  let players = tournament.players

  // add players
  let i = 0
  for(let id in players) {
    i++
    let player = players[id]
    let html = `
    <div class="player" id="${player.id}">
      <span class="placement">#${Number(i)}: </span>
      <span class="name">${player.username}</span>
    </div>
    `
    $('#bottom').append(html)
    
  }
}

function showOverview() {
  $('#overview').addClass('selected')
  $('#bottom').html('')
  $('#bottom').append(`<h2>Description:</h><br><p>${tournament.description}</p>`)
}