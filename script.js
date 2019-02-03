// title fun
$(() => {
    let stateL = 0
    let stateR = 2
    let states = ['_--', '-_-', '--_', '-_-']
    setInterval(() => {
        $('title').html(states[stateL]+' Mart '+states[stateR])
        stateL++
        stateR++
        if(stateL > 3) stateL = 0
        if(stateR > 3) stateR = 0
    }, 350)
})

// rainbow background
$(() => {
    let min = 10
    let max = 50
    let color = {r: 0, g: 0, b: 0}
    let crrntCol = 'r'
    setInterval(() => {
        if(crrntCol == 'r') {
            color.r++
            if(color.r > max) crrntCol = 'g'
            if(color.g > min) color.g--
            if(color.b > min) color.b--
        }
        if(crrntCol == 'g') {
            color.g++
            if(color.g > max) crrntCol = 'b'
            if(color.b > min) color.b--
            if(color.r > min) color.r--
        }
        if(crrntCol == 'b') {
            color.b++
            if(color.b > max) crrntCol = 'r'
            if(color.r > min) color.r--
            if(color.g > min) color.g--
        }
        $('body').css('background-color', `rgb(${color.r}, ${color.g}, ${color.b})`)
    }, 100)
})