let divisions
let clans
let players

$(() => {
  load()

})

async function load() {
  clans = await getClans()
  divisions = await getDivisions()
  players = await getPlayers()

  // sort players on points
  let sortedPlayers = Object.values(players).sort((a, b) => b.points-a.points)

  for(let i in sortedPlayers) addPlayer(sortedPlayers[i], Number(i)+1)
}

function addPlayer(player, placement) {
  let html = `
  <div class="player" id="${player.id}">
    <span class="placement">#${placement}: </span>
    <span class="name">${player.username}</span>
    <span class="points">Points: ${player.points}</span>
    <span class="clan">Clan: none</span>
    <span class="division">Division:</span><img class="divisionIMG" src="${divisions[player.division].image}" />
  </div>
  `
  $('#players').append(html)

  if(placement == 1) $(`#${player.id}`).addClass('first')
  if(placement == 2) $(`#${player.id}`).addClass('second')
  if(placement == 3) $(`#${player.id}`).addClass('third')

  // clickable clan
  if(player.clan != 'none') {
    let playerClan = clans[player.clan]
    $(`#${player.id} .clan`).html(`<a href="../clans?clan=${playerClan.id}">Clan: ${playerClan.name}</a>`)
  }

  // clickable name
  $(`#${player.id} .name`).html(`<a href="../profile?player=${player.id}">${player.username}</a>`)


}
550018296016273408