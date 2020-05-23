function getClans() {
  return new Promise((resolve, reject) => {
    $.get('https://hrinfo-api.herokuapp.com/clans', (data) => { resolve(data) })
  })
}

function getPlayers() {
  return new Promise((resolve, reject) => {
    $.get('https://hrinfo-api.herokuapp.com/players', (data) => { resolve(data) })
  })
}

function getDivisions() {
  return new Promise((resolve, reject) => {
    $.get('https://hrinfo-api.herokuapp.com/divisions', (data) => { resolve(data) })
  })
}

function getPlayerCurrentStats(userID) {
  return new Promise((resolve, reject) => {
    $.get(`https://api.helmetroyale.io/stats?userId=${userID}`, (data) => { resolve(data) })
  })
}

function getPlayerAllStats(id) {
  return new Promise((resolve, reject) => {
    $.get(`https://hrinfo-api.herokuapp.com/playerstats?id=${id}`, (data) => { resolve(data) })
  })
}

function getPlayingCount() {
  return new Promise((resolve, reject) => {
    $.get(`https://hrinfo-api.herokuapp.com/playingcount`, (data) => { resolve(data) })
  })
}

function getTournaments() {
  return new Promise((resolve, reject) => {
    $.get(`https://hrinfo-api.herokuapp.com/tournaments`, (data) => { resolve(data) })
  })
}