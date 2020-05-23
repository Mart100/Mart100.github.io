let players
let viewingP
let ctx

$(() => { onload() })
 
async function onload() {
  // get players
  players = await getPlayers()


  // on search enter
  $('#search').on('keypress', (event) => {
    if(event.key == 'Enter') viewPlayer($('#search').val())
    else searchmodeON()
  })

  // see if player in params
  let params = window.location.search.substr(1)
  let playerParam = params.replace('player=', '')
  if(playerParam != "") return viewPlayer(playerParam)

  // see if token cookie
  let tokenCookie = getCookie('token')
  if(tokenCookie != "") {
    let id = tokenCookie.split('-')[0]
    viewPlayer(id)
  }

}

function searchmodeOFF() {
  if($('#search').hasClass('searching') == false) return
  $('#search').removeClass('searching')
  $('#search').animate({'left': '1%', 'width': '350px'}, 300, () => {
    $('#profile').animate({'margin-top': '50px'}, 200)
    $('#profile').fadeIn(300)
  })
}

function searchmodeON() {
  if($('#search').hasClass('searching')) return
  $('#search').addClass('searching')
  let leftCalc = window.innerWidth/2 - 250
  $('#profile').animate({'margin-top': '150px'}, 200, () => {
    $('#search').animate({'left': leftCalc, 'width': '500px'}, 300)
  })
}

function viewPlayer(text) {
  let player = searchPlayer(text)
  console.log(window.location.search)
  if(window.location.search != `?player=${player.id}`) window.location.href = `./?player=${player.id}`

  viewingP = player
  $('#search').val('')
  $('#search').blur()

  // assign data
  $('#top #username').html(player.username)

  viewPlayerOverview()
  // appear
  searchmodeOFF()
}

function searchPlayer(text) {
  let possibilities = []
  for(let playerID in players) {
    let player = players[playerID]
    if(player.username == text) return player
    if(player.id == text) return player
    let score = player.username.score(text)
    possibilities.push([player.id, score])
  }

  // sort possibilities
  possibilities.sort((a, b) => b[1]-a[1])

  let highestPossiblePlayer = players[possibilities[0][0]]
  return highestPossiblePlayer
}

async function viewPlayerStatistics() {
  // update nav
  $('#navP span').removeClass('selected')
  $('#navP #navStatistics').addClass('selected')
  $('#bottom').html('')
  $('#bottom').css('display', 'block')

  gameNotConnected()
  
  let stats = await getPlayerCurrentStats(viewingP.gameID)

  $('#bottom').html('')
  $('#bottom').append(`<span>Games Played: ${stats.totalGamesPlayed}</span><br>`)
  $('#bottom').append(`<span>Created At: ${stats.createdAt}</span><br>`)
  $('#bottom').append(`<span>Kills: ${stats.kills}</span><br>`)
  $('#bottom').append(`<span>Wins: ${stats.wins}</span><br>`)
  $('#bottom').append(`<span>Kills per game: ${stats.kills / stats.totalGamesPlayed}</span><br>`)
}

async function viewPlayerOverview() {
  let player = viewingP
  // update nav
  $('#navP span').removeClass('selected')
  $('#navP #navOverview').addClass('selected')
  $('#bottom').html('')
  $('#bottom').css('display', 'block')

  // assign data
  $('#profile #bottom').html('')
  $('#profile #bottom').append('<br>')
  $('#profile #bottom').append(`<span>Clan: ${player.clan}</span><br>`)
  $('#profile #bottom').append(`<span>Points: ${player.points}</span><br>`)
  $('#profile #bottom').append(`<span>Division: ${player.division}</span><br>`)
}

function gameNotConnected() {
  let html = `
  <center>
    <span style="margin-top: 100px;">
      Game account not connected to HRinfo account. If you are the owner of this profile. 
      Please follow these <a href="../howtoconnectgame">instructions</a>
    </span>
  <center>
  `
  $('#bottom').html(html)
}