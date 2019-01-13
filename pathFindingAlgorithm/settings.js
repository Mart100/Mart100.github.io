let updateInfoInterval
$(() => {
    $('#infoButton').on('click', () => { 
        let window = new Window({id: 'infoWindow', title: 'info'})
        // set html
        window.setHtml(`
            <span id="${window.getID()+'-generation'}">generation: ${algorithm.generation}</span><br>
            <span id="${window.getID()+'-time'}">time Running: ${(Date.now()-algorithm.startTime)/1000} Seconds</span><br>
            <span onclick="openGenHistory()"> Open Generation History Window</span>
        `)

        //update data
        updateInfoInterval = setInterval(() => {
            if($('#'+window.getID())[0] == undefined) clearInterval(updateInfoInterval)
            else {
                $('#'+window.getID()+'-generation').html(`generation: ${algorithm.generation}`)
                $('#'+window.getID()+'-time').html(`time Running: ${(Date.now()-algorithm.startTime)/1000} Seconds`)

            }
        }, 100)
        

    })
    $('#settingsButton').on('click', () => {
        openSettingsWindow()
    })
    $('#viewButton').on('click', () => {
        openViewWindow()
    })
})


function showSettingsButtons() {
    $('#windowButtons').css('display', 'block')
}
function openGenHistory() {
    let window = new Window({id: 'genHistoryWindow', title: 'Generation History'})
        // set html
        window.setHtml(`
            <div id="infoWindowGenerations" style="overflow: auto; width: 100%; height: 200px; background-color: #f2f2f2; font-weight: bold;"></div><br>
        `)
        // set generations
        for(num in algorithm.history) $('#infoWindowGenerations').prepend(num+': '+JSON.stringify(algorithm.history[num]).replace(/"|{|}|"/g, '').replace(/:/g, ': ').replace(/,/g, ';   ')+'<br>')
}
function openSettingsWindow() {
    let window = new Window({id: 'settingsWindow', title: 'settings'})
}
function openViewWindow() {
    let window = new Window({id: 'viewWindow', title: 'view'})
    window.setHtml(`
    Hide everything: <input type="checkbox" id="viewSettings-hideEverything"><br/>
    Show FitnessGrid: <input type="checkbox" id="viewSettings-showFitnessGrid"><br/>
    Cube Trans: <input type="number" id="viewSettings-cubeTrans" min="0" step="0.1" max="1" value="0.5" style="width: 50px;"/><br/>
    cubeStroke: <input type="checkbox" id="viewSettings-cubeStroke"><br/>
    viewFirst: <input type="checkbox" id="viewSettings-viewFirst"><br/>
    Christmas Theme: <input type="checkbox" id="christmasTheme-viewFirst"><br/>
    `)
    // hide everything
    $('#viewSettings-hideEverything').on('click', () => {
        settings.view.hideEverything = $('#viewSettings-hideEverything').is(':checked')
    })
    // showFitnessGrid
    $('#viewSettings-showFitnessGrid').on('click', () => {
        settings.view.showFitnessGrid = $('#viewSettings-showFitnessGrid').is(':checked')
    })
    // cube trans
    $('#viewSettings-cubeTrans').on('change', () => {
        settings.view.cubeTrans = $('#viewSettings-cubeTrans').val()
    })
    // cube stroke
    $('#viewSettings-cubeStroke').on('click', () => {
        settings.view.cubeStroke = $('#viewSettings-cubeStroke').is(':checked')
    })
    // viewFirst
    $('#viewSettings-viewFirst').on('click', () => {
        settings.view.viewFirst = $('#viewSettings-viewFirst').is(':checked')
    })
    // christmasTheme
    $('#viewSettings-christmasTheme').on('click', () => {
        settings.view.christmasTheme = $('#viewSettings-christmasTheme').is(':checked')
    })




}