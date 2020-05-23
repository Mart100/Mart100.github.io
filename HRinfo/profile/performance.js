let trackedStats
let graph

async function viewPlayerPerformance() {
  // update nav
  $('#navP span').removeClass('selected')
  $('#navP #navPerformance').addClass('selected')
  $('#bottom').html('')

  trackedStats = await getPlayerAllStats(viewingP.id)
  if(Object.keys(trackedStats).length == 0) return gameNotConnected()

  $('#bottom').append('<div style="width: 850px; height: 460px;"><canvas id="myChart" width="500" height="265"></canvas></div>')
  $('#bottom').css('display', 'flex')
  let canvas = document.getElementById('myChart')
  ctx = canvas.getContext('2d')

  // create sidenav
  let sidenavHTML = `
  <div id="sidenav">
    <span id="KPG">Kills per game</span>
    <span id="WR">Win rate %</span>
    <span id="GP">Games played</span>
  </div>
  `
  $('#bottom').prepend(sidenavHTML)

  // on sidenav click
  $('#sidenav span').on('click', (event) => {
    $('#sidenav span').removeClass('selected')
    $(event.target).addClass('selected')

    if(event.target.id == 'KPG') killsPerGameGraph()
    if(event.target.id == 'WR') winRateGraph()
    if(event.target.id == 'GP') gamesPlayedGraph()
  })

  $('#KPG').trigger('click')
}

async function killsPerGameGraph() {
  // refine data
  let data = []
  let previous = {kills: 0, totalGamesPlayed: 0}
  for(let day in trackedStats) {
    let stat = trackedStats[day]
    let now = {kills: stat.kills - previous.kills, totalGamesPlayed: stat.totalGamesPlayed - previous.totalGamesPlayed}
    if(now.totalGamesPlayed == 0) now.totalGamesPlayed = 1
    data.push(now.kills / now.totalGamesPlayed)
    previous = {kills: stat.kills, totalGamesPlayed: stat.totalGamesPlayed}
  }
  createGraph(data, 'Kills per game')
}

async function winRateGraph() {
  // refine data
  let data = []
  for(let day in trackedStats) {
    let stat = trackedStats[day]
    data.push(stat.wins / stat.totalGamesPlayed * 100)
  }
  createGraph(data, 'Win rate %')
}

async function gamesPlayedGraph() {
  // refine data
  let data = []
  let previous = 0
  for(let day in trackedStats) {
    let stat = trackedStats[day]
    data.push(stat.totalGamesPlayed - previous)
    previous = stat.totalGamesPlayed
  }
  createGraph(data, 'Games Played')
}

function createGraph(data, label) {

  if(graph != undefined) graph.destroy()

  // get labels
  let timeStamps = Object.keys(trackedStats)
  let labels = []
  for(let i in timeStamps) {
    let time = new Date((timeStamps[i]-1)*24*60*60*1000).toDateString()
    let text = time.split(' ')[1] + ' ' + time.split(' ')[2]
    labels.push(text)
  }

  graph = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        backgroundColor: 'red',
        borderColor: 'red',
        fill: false,
        data: data
      }]
    },
    options: {}
  })
}