// on page load
$(() => {
    // functions 
    mouseListener()

    // remove ability to right click
    document.addEventListener('contextmenu', event => event.preventDefault())

    // speed change
    $('#settingsSpeed').change(() => {
        settings.speed = $('#settingsSpeed').val()
        clearInterval(processInterval)
        processInterval = setInterval(() => { tick() }, settings.speed)
    })
})


let inputChecker = setInterval(() => {
    // if left mouse is down
    if(input.mouse.down.left) {
        // if draw is on
        if(settings.toggles.draw) {
            // set cells to true
            grid[Math.floor(input.mouse.pos.x/canvas.width*gridSize.x)][Math.floor(input.mouse.pos.y/canvas.height*gridSize.y)] = true
        }
    }
    // if right mouse is down
    if(input.mouse.down.right) {
        // if draw is on
        if(settings.toggles.draw) {
            // set cells to false
            grid[Math.floor(input.mouse.pos.x/canvas.width*gridSize.x)][Math.floor(input.mouse.pos.y/canvas.height*gridSize.y)] = false
        }
    }
}, 10)
function mouseListener() {
    // on mouse down
    $('body').on('mousedown', (event) => { 
        if(event.which == 1) input.mouse.down.left = true
        if(event.which == 3) input.mouse.down.right = true
    })
    // on mouse up
    $('body').on('mouseup', (event) => { 
        if(event.which == 1) input.mouse.down.left = false
        if(event.which == 3) input.mouse.down.right = false
    })
    // on mouse move
    $('body').on('mousemove', (event) => {
        input.mouse.pos.x = event.pageX
        input.mouse.pos.y = event.pageY

    })
}
function toggleDraw() {
    // if draw is on
    if(settings.toggles.draw) {
        settings.toggles.draw = false
        $('#buttonsDraw').html('Disabled')
    }
    // if draw is off
    else {
        settings.toggles.draw = true
        $('#buttonsDraw').html('Enabled')
    }

}
function refresh() {
    // clear grid
    grid = []
    // new grid
    createGrid()
}
function createGrid() {
    for(let i=0;i<gridSize.x;i++) {
        grid[i] = []
        for(let j=0;j<gridSize.y;j++) {
            if(i==0 || i==gridSize.x-1 || j==0 || j==gridSize.y-1) grid[i][j] = false
            else {
                if(Math.round(Math.random()*5) == 0) grid[i][j] = true
                else grid[i][j] = false
            }
        }
    }
}
function pause(to) {
    // custom set with to
    if(to == true) settings.toggles.pause = false
    if(to == false) settings.toggles.pause = true

    // if pause is on
    if(settings.toggles.pause) {
        settings.toggles.pause = false
        $('#buttonsPause').html('Pause')
    }
    // if pause is off
    else {
        settings.toggles.pause = true
        $('#buttonsPause').html('Unpause')
    }

}
function clearAll() {
    // set every cell to dead
    for(let i=0;i<gridSize.x;i++) for(let j=0;j<gridSize.y;j++) grid[i][j] = false
}