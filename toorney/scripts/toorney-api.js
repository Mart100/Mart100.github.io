let apiURL = 'https://api.toorney.xyz'

function getTournaments() {
  return new Promise((resolve, reject) => {
    $.get(`${apiURL}/tournaments`, (data) => { resolve(data) })
  })
}

function getGuilds() {
  return new Promise((resolve, reject) => {
    $.get(`${apiURL}/guilds`, (data) => { resolve(data) })
  })
}
function startTournament(token, tournament) {
  return new Promise((resolve, reject) => {
    $.get(`${apiURL}/starttournament?token=${token}&tournament=${tournament}`, (data) => { resolve(data) })
  })
}
function resetTournament(token, tournament) {
  return new Promise((resolve, reject) => {
    $.get(`${apiURL}/resettournament?token=${token}&tournament=${tournament}`, (data) => { resolve(data) })
  })
}
function deleteTournament(token, tournament) {
  return new Promise((resolve, reject) => {
    $.get(`${apiURL}/deletetournament?token=${token}&tournament=${tournament}`, (data) => { resolve(data) })
  })
}
function shuffleTournament(token, tournament) {
  return new Promise((resolve, reject) => {
    $.get(`${apiURL}/shuffletournament?token=${token}&tournament=${tournament}`, (data) => { resolve(data) })
  })
}
function finishTournament(token, tournament) {
  return new Promise((resolve, reject) => {
    $.get(`${apiURL}/finishtournament?token=${token}&tournament=${tournament}`, (data) => { resolve(data) })
  })
}
function getAdminTournaments(user) {
  return new Promise((resolve, reject) => {
    $.get(`${apiURL}/adminTournaments?user=${user}`, (data) => { resolve(data) })
  })
}