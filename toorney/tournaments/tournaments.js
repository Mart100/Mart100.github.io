$(() => { load() })

let tournaments
let guilds

async function load() {
  tournaments = await getTournaments()
  guilds = await getGuilds()

  
  let sortedTournaments = Object.values(tournaments).sort((a, b) => scoreTournament(b)-scoreTournament(a))
  for(let t of sortedTournaments) addTournament(t)
}


function addTournament(tournament) {
  if(tournament.status == 'ongoing') tournament.status == 'In Progress'
  if(tournament.status == 'closed') tournament.status == 'Finished'

  if(guilds[tournament.host] == undefined) return

  // tournament Status
  let html = `
  <div class="tournament" id="${tournament.id}"><br>
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

  if(tournament.status == 'open') $(`#${tournament.id} .status`).css('color', 'green')
  if(tournament.status == 'ongoing') $(`#${tournament.id} .status`).css('color', 'yellow')
  if(tournament.status == 'closed') $(`#${tournament.id} .status`).css('color', 'red')

  $(`#${tournament.id}`).on('click', () => {
    window.location.href = `./?tournament=${tournament.id}`
  })
}

function scoreTournament(t) {
  let score = 0
  if(t.status == 'open') score += 50
  if(t.status == 'ongoing') score += 25
  score += Object.keys(t.players).length
  return score
}