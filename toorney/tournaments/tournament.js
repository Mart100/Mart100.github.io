$(() => { loadT() })
let tournament
let guild

async function loadT() {
  let params = window.location.search.substr(1).split('&')
  console.log(params)
  let tournamentParam = params[0].replace('tournament=', '')
  let viewingParam
  if(params[1]) viewingParam = params[1].replace('viewing=', '')

  if(tournamentParam == "") return

  let tournaments = await getTournaments()
  guilds =  await getGuilds()
  
  tournament = Object.values(tournaments).find((t) => t.id == tournamentParam || t.name == tournamentParam)
  console.log(tournament)
  guild = guilds[tournament.host]

  $('#tournaments').remove()

  // add advertisements
  $('body').append(`    
  <!-- Ad horizontal tournament -->
    <ins class="adsbygoogle" id="adsbygoogleH1"
        style="width:728px;height:90px"
        data-ad-client="ca-pub-7510922462770765"
        data-ad-slot="4068793328"></ins>
    <script>(adsbygoogleH1 = window.adsbygoogle || []).push({});</script>
    
    <!-- side Ad vertical tournament -->
    <ins class="adsbygoogle" id="adsbygoogleV1" style="display:inline-block;width:300px;height:550px" data-ad-client="ca-pub-7510922462770765" data-ad-slot="8233546847"></ins>
    <script>(adsbygoogleV1 = window.adsbygoogle || []).push({});</script>

    <div id="tournament"></div>

    <!-- side Ad vertical tournament -->
    <ins class="adsbygoogle" id="adsbygoogleV2" style="display:inline-block;width:300px;height:550px" data-ad-client="ca-pub-7510922462770765" data-ad-slot="8233546847"></ins>
    <script>(adsbygoogleV2 = window.adsbygoogle || []).push({});</script>
  `)

  $('#tournament').append(`
    <div id="top">
      <img id="image" src="${guild.icon}" />
      <div id="name">${XSS(tournament.name)}</div>
    </div>
    <div id="navT">
      <span id="overview" onclick="showOverview()">Overview</span>
      <span id="players" onclick="showPlayers()" >Players</span>
      <span id="brackets">Brackets</span>
    </div>
    <div id="bottom"></div>
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

  $('#tournament').fadeIn()
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
      <span class="name">${XSS(player.username)}</span>
    </div>
    `
    $('#bottom').append(html)
    
  }
  $('#bottom').css('position', 'relative')
}

function showOverview() {
  $('#overview').addClass('selected')
  $('#bottom').html('')
  $('#bottom').append(`<h2>Description:</h><br><p>${tournament.description ? XSS(tournament.description) : 'None'}</p>`)
  $('#bottom').append(`<a style="color: white; font-size: 25px;" href="https://discord.gg/${guild.invite}">Join server!</a>`)
  $('#bottom').append('<br><br><br>This page is still a Work In Progress!')
}