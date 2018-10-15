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
            let settingsWindow = new Window({id:'settingsWindow', title: 'Settings'})
            // add form
            settingsWindow.setHtml(`
            <form id="settings-form">
                <div>
                    <label for="settings-population">population: </label>
                    <input type="number" id="settings-population" min="200" max="5000" step="200" value="400"/>
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
            distanceGrid[3][3] = 1
            
            let stopLoop = false
            let finishGeneration = 0
            newGeneration(1)

            // loop trough "generations"
            function newGeneration(g) { //for(let g=0;g<1e3;g++) {
                //if(g % 10 == 0) console.log('generation: '+g)
                // if(stopLoop) break

                let newGrid = distanceGrid.slice()
                // loop trough pixels
                for(let x=0; x<distanceGrid.length; x++) { 
                    for(let y=0; y<distanceGrid[0].length; y++) { 
                        if(distanceGrid[x][y] == 0) continue
                        if(distanceGrid[x][y] != g-1) continue
                        

                        // only pixels that have been effected
                        if(distanceGrid[x-1][y] == 0 && !pixels.includes((x-1)+'|'+(y))) newGrid[x-1][y] = g  // left
                        if(distanceGrid[x][y-1] == 0 && !pixels.includes((x)+'|'+(y-1))) newGrid[x][y-1] = g // top
                        if(distanceGrid[x+1][y] == 0 && !pixels.includes((x+1)+'|'+(y))) newGrid[x+1][y] = g // right
                        if(distanceGrid[x][y+1] == 0 && !pixels.includes((x)+'|'+(y+1))) newGrid[x][y+1] = g // bottom
                        //console.log(distanceGrid[x][y+1] == 0, !checkForPixels(x, y, 0, 10))

                        // if pixel is at finish
                        if(canvas.width-x*10 < 50 && canvas.height-y*10 < 50) {
                            highestDistance = newGrid[x][y]
                            finishGeneration = g
                            setTimeout(() => {
                                stopLoop = true
                                nextPhase('evolution')
                                console.log('DONE: spreading distance Virus')
                            }, 2000)
                            
                        }
                    }
                }
                distanceGrid = newGrid.slice()
                if(!stopLoop) {
                    setTimeout(() => { newGeneration(g+1) }, 1)

                }
                
            }
            break
        }
        case('evolution'): {
            $('#phaseMenu').html('<center>Evolution</center>')
            createRandomPopulation()


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