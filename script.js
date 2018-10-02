// title fun
$(() => {
    let stateL = 0
    let stateR = 2
    let states = ['_--', '-_-', '--_', '-_-']
    setInterval(() => {
        console.log('test')
        $('title').html(states[stateL]+' Mart '+states[stateR])
        stateL++
        stateR++
        if(stateL > 3) stateL = 0
        if(stateR > 3) stateR = 0
    }, 350)
})