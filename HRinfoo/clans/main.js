let clans
let clan
let players
let divisions

// on page load
$(() => {
  
  let params = window.location.search.substr(1)
  let clanParam = params.replace('clan=', '')



  // read clans from database
  $.get('https://hrinfo-api.herokuapp.com/clans', (data) => { 
    clans = data

    let sortedClans = Object.values(clans).sort((a, b) => clanPointFunc(b) - clanPointFunc(a))
    for(let i in sortedClans) addClan(sortedClans[i])
    if(clanParam != '') showClanFull(clanParam)
  })

  let text = `
  <span style="position: relative; top: 25px; ">
    To have your own clan added here,<br> Invite this discord bot to your clan discord server!<br>
    <a href="https://discordapp.com/oauth2/authorize?client_id=578905640181825556&permissions=67585&scope=bot">Bot invite</a>
  </span>
  `
  $('#clans').append(`<div style="color: white; text-align: center; cursor: default;" class="clan">${text}</div>`)
})

function clanPointFunc(clan) {
  let points = 0
  points += clan.members.length * 100
  points += clan.points
  points += clan.discordMemberCount
  points += Number(clan.verified)*500
  return points
}

function addClan(clan) {
  let html = `
  <div class="clan" id="clan-${clan.id}">
    <img src="${clan.image}"/>
    <span class="name">${clan.name}</span>
    <span class="desc">${clan.desc}</span>
    <span class="memberCount">Members: ${clan.members.length}</span>
    <span class="discordMembers">Discord Members: ${clan.discordMemberCount}</span>
    <span class="tag">Tag: ${clan.tag}</span>
    <span class="points">Points: ${clan.points}</span>
    <span class="click">click for more info</span>
  </div>
  `
  $('#clans').append(html)

  $(`#clan-${clan.id}`).on('click', () => {
    window.location += `?clan=${clan.id}`
  })

  if(clan.invite == 'none') $(`#clan-${clan.name} .discord`).css('visibility', 'hidden')

}

//
function showClanFull(clanID) {
  clan = clans[clanID]
  let html = `
    <div id="profile">
      <div id="top">
        <img id="image" src="${clan.image}" />
        <div id="name">${clan.name}</div>
        <div id="joinclan">Join discord</div>
      </div>
      <div id="navC">
        <span class="overview" onclick="showOverview()">Overview</span>
        <span class="members" onclick="showMembers()" >Members</span>
      </div>
      <div id="bottom">

      </div>
    </div>
  `
  $('#clans').remove()
  $('body').append(html)
  showOverview()

  $('#joinclan').on('click', () => {
    window.location.href = `https://discord.gg/${clan.invite}`
    /*
    let token = getCookie('token')
    let id = token.split('-')[0]
    let stoken = token.split('-')[1]
    console.log(stoken, id)
    if(token == '') return window.location.href = '../login'
    else {
      leaveClan(id, stoken)
      setTimeout(() => {
        $.ajax({
          contentType: 'application/json',
          data: JSON.stringify({ "id": id, "what": "clan", "to": clan.name, "token": stoken }),
          type: 'POST',
          url: 'https://hrinfo-api.herokuapp.com/updateplayer'
        })
        //location.reload()
      }, 1000)
    }*/
  })

}
async function showMembers() {

  players = await getPlayers()
  divisions = await getDivisions()


  $('#navC span').removeClass('selected')
  $('#navC .members').addClass('selected')
  $('#bottom').html('')
  $('#bottom').append('')

  // add players

  let sortedPlayers = Object.values(players).sort((a, b) => b.points-a.points)
  let filteredPlayers = sortedPlayers.filter((p) => p.clan == clan.id )

  for(let i in filteredPlayers) {
    let player = filteredPlayers[i]
    let html = `
    <div class="player" id="${player.id}">
      <span class="placement">#${Number(i)+1}: </span>
      <span class="name">${player.username}</span>
      <span class="points">Points: ${player.points}</span>
      <span class="division">Division:</span><img class="divisionIMG" src="${divisions[player.division].image}" />
    </div>
    `
    $('#bottom').append(html)
  }
}

function showOverview() {
  $('#navC span').removeClass('selected')
  $('#navC .overview').addClass('selected')
  $('#bottom').html('')
  $('#bottom').append(`<br>`)
  $('#bottom').append(`<span>Points: ${clan.points}</span><br>`)
  $('#bottom').append(`<span>Discord members: ${clan.discordMemberCount}</span><br>`)
  $('#bottom').append(`<span>Members: ${clan.members.length}</span>`)
}

function leaveClan(id, token) {
  $.ajax({
    contentType: 'application/json',
    data: JSON.stringify({ "id": id, "what": "clan", "to": "none", "token": token }),
    type: 'POST',
    url: 'https://hrinfo-api.herokuapp.com/updateplayer'
  })
}