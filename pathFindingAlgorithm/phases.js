async function nextPhase(ToPhase) {
    if(phase == ToPhase) return
    phase = ToPhase
    switch(ToPhase) {
        case('settings'): {
            // some stuff
            $('#nextButton').remove()
            $('#canvas').css('cursor', 'default')
            $('#phaseMenu').html('<center>Settings</center>')

            // create settings window
            let settingsWindow = new Window({id:'settingsWindow', title: 'Settings', size: {width: '300px', height: '500px'}, exitButton: false})
            // add form
            settingsWindow.setHtml(`
            <form id="settings-form">
                <div>
                    <label for="settings-population">population Size: </label>
                    <input type="number" id="settings-population" min="1" max="5000" value="400" style="width: 50px;"/>
                    <span class="validity"></span>
                </div>
                <div>
                    <label for="settings-plusStepsPerGen">Extra Steps Per Generation: </label>
                    <input type="number" id="settings-plusStepsPerGen" min="0" value="5" style="width: 50px;"/>
                    <span class="validity"></span>
                </div>
                <div>
                    <label for="settings-bestOfPrevious">Best of Previous Gen 0-1: </label>
                    <input type="number" id="settings-bestOfPrevious" max="1" value="0.1" style="width: 50px;"/>
                    <span class="validity"></span>
                </div>
                
                <input type="submit" id="settingsWindowSubmit">
            </form>
            `)

            // on settings submit
            $('#settings-form').submit((e) => {
                e.preventDefault()
                // set all settings
                algorithm.populationSize = Number($('#settings-population').val())

                // remove settings page
                settingsWindow.remove()
                nextPhase('loading')

            })
            break
        }
        case('loading'): {
            //canvasFastReload = false
            // loading phaseMenu
            $('#phaseMenu').html('<center>Loading...</center>')

            // calculate Lines to pixels
            for(let num in drawing.lines) {
                let line = drawing.lines[num]
                let vector = {x: line.end.x-line.start.x, y: line.end.y-line.start.y }
                let distance = Math.floor(Math.sqrt(Math.abs(vector.x*vector.x)+Math.abs(vector.y*vector.y)))
                // loop trough distance
                for(let i=0; i < distance; i++) {
                    let whereOnVector = {x: vector.x/distance*i, y: vector.y/distance*i}
                    let rotatedVector = {x: -whereOnVector.y/i, y: whereOnVector.x/i}

                    pixels.push(Math.floor((line.start.x + whereOnVector.x)/10)+'|'+Math.floor((line.start.y + whereOnVector.y)/10))
                }
            }
            console.log('DONE: calculating lines into pixels')
            // spread distance virus

            // create grid
            for(let x=0;x<canvas.width/10;x++) { 
                distanceGrid[x] = []; 
                for(let y=0;y<canvas.height/10;y++) distanceGrid[x][y] = 0
            }
            // begin virus
            distanceGrid[Math.round(canvas.width/10-10)][Math.round(canvas.height/10-10)] = 1
            
            let stopLoop = false
            let isDoingNothing = false
            newGeneration(1)

            function newGeneration(g) {
                isDoingNothing = true

                let newGrid = distanceGrid.slice()
                // loop trough pixels
                for(let x=0; x<distanceGrid.length; x++) { 
                    for(let y=0; y<distanceGrid[0].length; y++) { 
                        if(distanceGrid[x][y] == 0) continue
                        if(distanceGrid[x][y] != g-1) continue
                        
                        // only pixels that have not been effected
                        if(distanceGrid[x-1][y] == 0 && !pixels.includes((x-1)+'|'+(y))) { isDoingNothing = false; newGrid[x-1][y] = g }// left
                        if(distanceGrid[x][y-1] == 0 && !pixels.includes((x)+'|'+(y-1))) { isDoingNothing = false; newGrid[x][y-1] = g }// top
                        if(distanceGrid[x+1][y] == 0 && !pixels.includes((x+1)+'|'+(y))) { isDoingNothing = false; newGrid[x+1][y] = g }// right
                        if(distanceGrid[x][y+1] == 0 && !pixels.includes((x)+'|'+(y+1))) { isDoingNothing = false; newGrid[x][y+1] = g }// bottom
                    }
                }
                // if doing nothing
                if(isDoingNothing && g > 10) {
                    // set every pixel relative to lowest
                    let startValue = distanceGrid[2][2]
                    for(let x=0; x<distanceGrid.length; x++) { 
                        for(let y=0; y<distanceGrid[0].length; y++) {
                            newGrid[x][y] -= startValue
                            newGrid[x][y] = Math.abs(newGrid[x][y])



                        }
                    }
                    algorithm.topDistance = distanceGrid[Math.round(canvas.width/10-10)][Math.round(canvas.height/10-10)]
                    distanceGrid = newGrid.slice()

                    nextPhase('evolution')
                    console.log('DONE: spreading distance Virus')
                } else {
                    distanceGrid = newGrid.slice()
                    setTimeout(() => { newGeneration(g+1) }, 1)
                }
            }
            break
        }
        case('evolution'): {
            $('#phaseMenu').html('<center>Evolution</center>')
            createRandomPopulation()
            showSettingsButtons()
            algorithm.startTime = Date.now()
        }

    }
}
function checkForPixels(X, Y, plusX, plusY) {
    for(let x=X*10+plusX; x<X*10+10+plusX; x++) { 
        for(let y=Y*10+plusY; y<Y*10+10+plusY; y++) {
            if(pixels.toString().includes(x+'|'+y)) return true
        }
    }
    return false
}