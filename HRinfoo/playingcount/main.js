let playingCount
let chart

$(() => { load() })

async function load() {

  // select All Time
  $('#AT').addClass('selected')

  // on sidenav click
  $('#sidenav span').on('click', (event) => {
    $('#sidenav span').removeClass('selected')
    $(event.target).addClass('selected')
    if(event.target.id == 'LH') LHgraph()
    if(event.target.id == 'LD') LDgraph()
    if(event.target.id == 'LW') LWgraph()
    if(event.target.id == 'LM') LMgraph()
    if(event.target.id == 'LY') LYgraph()
    if(event.target.id == 'AT') ATgraph()
  })

  playingCount = await getPlayingCount()
  ATgraph()
}

function LHgraph() {
  let cuttedPlayingCount = Object.values(playingCount).slice(-6)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps, 'hour')
}
function LDgraph() {
  let cuttedPlayingCount = Object.values(playingCount).slice(-6*24)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps, 'day')
}
function LWgraph() {
  let cuttedPlayingCount = Object.values(playingCount).slice(-6*24*7)
  cuttedPlayingCount = thinData(cuttedPlayingCount)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps, 'week')
}
function LMgraph() {
  let cuttedPlayingCount = Object.values(playingCount).slice(-6*24*7*31)
  cuttedPlayingCount = thinData(cuttedPlayingCount)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps, 'month')
}
function LYgraph() {
  let cuttedPlayingCount = Object.values(playingCount).slice(-6*24*7*31*12)
  cuttedPlayingCount = thinData(cuttedPlayingCount)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps, 'year')
}
function ATgraph() {
  let cuttedPlayingCount = Object.values(playingCount)
  cuttedPlayingCount = thinData(cuttedPlayingCount)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps, 'all')
}

function refineData(unrefinedData) {
  let data = {asia: [], eu: [], us: [], sa: []}
  let timeStamps = []
  for(let hm of unrefinedData) {
    data.eu.push(hm.eu)
    data.us.push(hm.us)
    data.sa.push(hm.sa)
    data.asia.push(hm.asia)
    timeStamps.push(hm.recordedAt)
  }
  return {data: data, timeStamps: timeStamps}
}

function thinData(data) {
  let amount = Math.floor(data.length/500)
  let newData = []
  for(let a in data) {
    if(a % amount == 0) {
      newData.push(data[a])
    }
  }
  return newData
}

function createGraph(data, timeStamps, timespan) {
  // timeStamps to labels
  let labels = []
  let currentTime = Math.floor(Date.now() / (1000*60*10))
  for(let i in timeStamps) {
    let time = new Date(timeStamps[i]*10*60*1000)
    if(timespan == 'hour' || timespan == 'day') {
      let text = time.getHours()+':'+time.getMinutes()
      if(time.getMinutes() < 10) text += '0'
      labels.push(text)
    }
    if(timespan == 'week' || timespan == 'month' || timespan == 'year' || timespan == 'all') {
      let text = time.toDateString()
      text = text.split(' ').slice(1).join(' ')
      labels.push(text)
    }
  }

  if(chart != undefined) chart.destroy()

  // get ctx
  let ctx = document.getElementById('graph').getContext('2d')

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Asia',
        backgroundColor: 'green',
        borderColor: 'green',
        fill: false,
        data: data.asia
      },
      {
        label: 'Europe',
        backgroundColor: 'blue',
        borderColor: 'blue',
        fill: false,
        data: data.eu
      },
      {
        label: 'America',
        backgroundColor: 'red',
        borderColor: 'red',
        fill: false,
        data: data.us
      },
      {
        label: 'South-america',
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        fill: false,
        data: data.sa
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        }]
      }
    }
  })
}