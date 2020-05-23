$(() => { load() })

let tournaments

async function load() {
  tournaments = await getTournaments()

  for(let id in tournaments) addTournament(tournaments[id])
}


function addTournament(tournament) {
  let html = `
  <div class="tournamentWrapper">
    <div class="tournament" id="${tournament.id}">
      <div class="name">${tournament.name}</div>
      <div class="playerCount"><span style="font-size: 40px; color: yellow;">${Object.keys(tournament.players).length} </span>  Players</div><br><br><br><br>
      <span>Status: ${tournament.status}</span><br>
    </div>
  </div>
  `

  $('#tournaments').append(html)

  $(`#${tournament.id}`).on('click', () => { window.location.href = `./?tournament=${tournament.id}` })
}