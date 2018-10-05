async function nextPhase(ToPhase) {
    if(phase == ToPhase) return
    phase = ToPhase
    switch(ToPhase) {
        case('settings'): {
            $('body').append(`
            <div id="settingsWindow" style="left: ${screen.width/2-200}px; top: ${screen.height/2-250}px;">
                <div id="settingsWindowHead">Settings</div>

                <form id="settings-form">
                    <div>
                        <label for="settings-maxtime">maxTime (ms): </label>
                        <input type="number" id="settings-maxtime" min="1000" step="1000" value="8000"/>
                        <span class="validity"></span>
                    </div>
                    <div>
                        <label for="settings-population">population: </label>
                        <input type="number" id="settings-population" min="100" max="5000" step="100" value="400"/>
                        <span class="validity"></span>
                    </div>
                    
                    <input type="submit" id="settingsWindowSubmit">
                </form>
            </div>`)
            $('#settingsWindowHeadMap').css('background-color', '#b7b7b7')
            $('#phaseMenu').html('<center>Settings</center>')

            // on settingsWindowHead grabber
            $('#settingsWindowHead').on('mousedown', () => {  
                $('body').css('cursor', 'grabbing')
                settings.window.offset = {x: elemToNum($('#settingsWindow').css('left'))-input.mouse.pos.x, y: elemToNum($('#settingsWindow').css('top'))-input.mouse.pos.y}
                settings.window.drag = true
            })
            $('#settingsWindowHead').on('mouseup', () => {    
                $('body').css('cursor', 'grab')
                settings.window.drag = false
            
            })
            $('#settingsWindowHead').on('mouseenter', () => { $('body').css('cursor', 'grab') })
            $('#settingsWindowHead').on('mouseleave', () => { $('body').css('cursor', 'default') })

            // on settings submit
            $('#settings-form').submit((e) => { 
                e.preventDefault()
                // set all settings
                $('#settings-maxtime')

                // remove settings page
                $('#settingsWindow').remove()
                nextPhase('loading')

            })
        }
        case('loading'): {
            // calculate Lines to pixels
            for(let num in drawing.lines) {
                let distance = []
                // loop trough distance

            }
        }


    }
}