let canvas
let ctx
// settings
let settings = { totalPoints: 0, totalWater: 0, simulationSpeed: 0, strength: 0}
let mode = ''

let TickInterval
let points = []
let extraData = {points: []}
let modes = {
    realisticWaves: {
        settings: `
            TotalWater: <input type="number" id="settingsTotalWater" value="4000" step="500" style="width: 50px;">
            TotalPoints: <input type="number" id="settingsTotalPoints" value="20" step="1" style="width: 50px;">
            Speed: <input type="number" id="settingsSpeed" value="100" step="10" style="width: 50px;">
        `,
        buttons: `
        <button onclick="wave({size: 100, duration: 100})">Small Wave</button>
        <button onclick="wave({size: 250, duration: 250})">Medium Wave</button>
        <button onclick="wave({size: 500, duration: 500})">Big Wave</button>
        `
    },
    noise: {
        settings: `
            TotalWater: <input type="number" id="settingsTotalWater" value="4000" step="500" style="width: 50px;">
            TotalPoints: <input type="number" id="settingsTotalPoints" value="20" step="1" style="width: 50px;">
            Speed: <input type="number" id="settingsSpeed" value="10" step="10" style="width: 50px;">
            Strength: <input type="number" id="settingsStrength" value="50" step="10" style="width: 50px;">
        `,
        buttons: `
        `
    }
}

reset()

$(function() {
    // setup canvas
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.translate(0, canvas.height)
    ctx.scale(1, -1)

    // set mode
    changeMode('realisticWaves')

    // run loops
    setInterval(() => { frame() }, 1000/60)
    TickInterval = setInterval(() => { tick() }, settings.simulationSpeed)
    setInterval(() => { updateSettings() }, 500)
})

function reset() {
    // reset
    points = []
    extraData.points = []
    // create points
    for(let i=0;i<settings.totalPoints;i++) {
        points.push(settings.totalWater/settings.totalPoints)
        switch(mode) {
            case('noise'): {
                if(Math.random() > 0.5) extraData.points.push({trend: true})
                else extraData.points.push({trend: false})
                break
            }
        }
    }

}
function wave(data) {
    switch(mode) {
        case('realisticWaves'): {
            // example: wave({size: 100, duration: 100})
            points[0] += data.size
            setTimeout(() => { points[0] -= data.size}, data.duration)
        }
    }
}
function updateSettings() {
    // TotalWater
    if(settings.totalWater != $('#settingsTotalWater').val() && $('#settingsTotalWater').val() != undefined) {
        settings.totalWater = $('#settingsTotalWater').val()
        reset()
    }
    // Total Points
    if(settings.totalPoints != $('#settingsTotalPoints').val() && $('#settingsTotalPoints').val() != undefined) {
        settings.totalPoints = Number($('#settingsTotalPoints').val())
        reset()
    }
    // Strength
    if(settings.strength != $('#settingsStrength').val() && $('#settingsStrength').val() != undefined) {
        settings.strength = Number($('#settingsStrength').val())
        reset()
    }
    // Simulation Speed
    if(settings.simulationSpeed != $('#settingsSpeed').val() && $('#settingsSpeed').val() != undefined) {
        settings.simulationSpeed = $('#settingsSpeed').val()
        clearInterval(TickInterval)
        TickInterval = setInterval(() => { tick() }, settings.simulationSpeed)
    }
}
// on mode change
function changeMode(to) {
    // set mode to new mode
    mode = to
    // apply new settings to hud
    $('#settings').html(modes[to].settings)
    // apply new buttons to hud 
    $('#buttons').html(modes[to].buttons)
    reset()

}