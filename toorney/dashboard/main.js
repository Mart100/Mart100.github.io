let tournaments = {}
let token = ''

$(() => { onLoad() })

async function onLoad() {

  let userToken = getCookie('token')

  // Demo mode: if no token present, use demo-token and persist it in cookie
  if(!userToken || userToken == '') {
    token = 'demo-token'
    if(typeof setCookie === 'function') setCookie('token', token, 365)
  } else token = userToken

  tournaments = await getAdminTournaments(token)

  $('#loading').fadeOut()

  let params = new URLSearchParams(window.location.search) 
  if(params.has('t')) {
    let tournamentID = params.get('t')
    loadTournament(tournamentID)
  } 
  else {
    $('body').append('<div id="tournaments"></div>')
    loadTournaments()
  }
}

function getSwitchBox(id, checked) {
  return `
<label class="switch">
  <input name="${id}" type="checkbox" ${checked ? 'checked' : ''} value="true" id="option-${id}">
  <span class="slider round"></span>
</label>
`
}

async function loadTournament(tournamentID) {

  let tournament = tournaments[tournamentID]
  
  let html = `
<div id="tournament">
  <div class="info"> 
    <h2>Info:</h2>
    <div>Players: ${Object.keys(tournament.players).length}</div>
    <div><a href="https://challonge.com/${tournament.name}">Challonge link</a></div>
  </div>
  <div class="actions">
    <h2>Actions:</h2>
    <button id="s-start">Start tournament</button>
    <button id="s-reset">Reset tournament</button>
    <button id="s-shuffle">Shuffle tournament</button>
    <button id="s-finish">Finish tournament</button>
    <button id="s-delete">Delete tournament</button>
  </div>
  <div class="playerActions">
    <h2>Player Actions:</h2>
    <form class="playerAction">
      <input type="text" name="id" value=""/>
      <button type="submit">Kick Player from tournament</button>
    </form>
    <form class="playerAction">
      <input type="text" name="id" value=""/>
      <button type="submit">Force Player to join in tournament</button>
    </form>
  </div>
  <form action="https://toorney-api.herokuapp.com/saveFromDashboard">
    <input type="hidden" name="token" value="${token}">
    <input type="hidden" name="tournament" value="${tournament.id}">
    <h2>Values:</h2>
    <div class="value">
      <span class="desc">Description of this tournament</span>
      <input type="text" name="description" value="${tournament.description}"/>
    </div>
    <div class="value">
      <span class="desc">How many days players have to finish their round</span>
      <input type="number" name="roundMaxTime" value="${tournament.roundMaxTime}"/>
    </div>
    <div class="value">
      <span class="desc">Players will automatically get this role when they join this tournament. ( Fill in role ID )</span>
      <input type="text" name="autorole" value="${tournament.autorole}"/>
    </div>
    <h2>Options:</h2> 
    <div class="option">
      <div class="switch">${getSwitchBox('teams', tournament.teams)}</div>
      <span class="title">Teams</span><br>
      <span class="desc">If this is enabled. Teams will be able to join the tournament. And players will no longer be able to join.</span>
    </div>
    <div class="option">
      <div class="switch">${getSwitchBox('forcejoinonly', tournament.forcejoinonly)}</div>
      <span class="title">Force Join Only</span><br>
      <span class="desc">If this is enabled. Players can't join tournaments. Only administrators can add players.</span>
    </div>
    <button type="submit">Save</button>
  </form>
</div>
  `
  $('body').append(html)

  // Intercept dashboard form submit and save locally via mock API
  $('#tournament form').on('submit', async (e) => {
    e.preventDefault()
    $("#tournament form").find(':checkbox:not(:checked)').attr('value', 'false').prop('checked', true);

    const description = $('#tournament input[name="description"]').val()
    const roundMaxTime = Number($('#tournament input[name="roundMaxTime"]').val())
    const autorole = $('#tournament input[name="autorole"]').val()
    const teams = $('#option-teams').is(':checked')
    const forcejoinonly = $('#option-forcejoinonly').is(':checked')

    tournament.description = description
    tournament.roundMaxTime = roundMaxTime
    tournament.autorole = autorole
    tournament.teams = teams
    tournament.forcejoinonly = forcejoinonly

    try {
      const res = await saveTournament(token, tournament)
      if(res && res.success) alert('Saved (demo)')
      else alert('Save failed')
    } catch (err) { alert('Save error') }
  })

  if(tournament.status != 'ongoing') {
    $('#s-end').attr('disabled', true)
    $('#s-reset').attr('disabled', true)
  }
  if(tournament.status != 'open') {
    $('#s-start').attr('disabled', true)
    $('#s-shuffle').attr('disabled', true)
  }

  $('#s-start').on('click', async () => {
    if(!window.confirm('Are you sure you want to start this tournament?')) return
    let res = await startTournament(token, tournament.id)
    location.reload()
  })
  
  $('#s-reset').on('click', async () => {
    if(!window.confirm('Are you sure you want to reset this tournament?')) return
    let res = await resetTournament(token, tournament.id)
    location.reload()
  })
  
  $('#s-shuffle').on('click', async () => {
    if(!window.confirm('Are you sure you want to shuffle this tournament?')) return
    let res = await shuffleTournament(token, tournament.id)
    location.reload()
  })

  $('#s-finish').on('click', async () => {
    if(!window.confirm('Are you sure you want to finish this tournament?')) return
    let res = await finishTournament(token, tournament.id)
    location.reload()
  })

  $('#s-delete').on('click', async () => {
    if(!window.confirm('Are you sure you want to delete this tournament?')) return
    let res = await deleteTournament(token, tournament.id)
    location.reload()
  })
}
async function loadTournaments() {

  let guilds = await getGuilds()

  $('body').append('<div id="tournaments"></div>')

  // add tournaments
  for(let tournamentID in tournaments) {
    let tournament = tournaments[tournamentID]

    let html = `
    <div class="tournament" id="tournament-${tournament.id}"><br>
      <span class="name">${XSS(tournament.name)}</span><br><br>
      <span><b>Host:</b></span><br>
      <span>${XSS(guilds[tournament.host].name)}</span><br><br>

      <span><b>Players:</b></span><br>
      <span>${Object.keys(tournament.players).length}</span><br><br>

      <span><b>Status:</b></span><br>
      <span class="status">${XSS(tournament.status)}</span><br>
    </div>
    `

    $('#tournaments').append(html)

    $('#tournament-'+tournamentID).on('click', () => {
      window.location = '?t='+tournamentID
    })
  }
}