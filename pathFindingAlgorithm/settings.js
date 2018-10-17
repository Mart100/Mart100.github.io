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
        // set generations
        for(num in algorithm.history) {
            $('#infoWindowGenerations').prepend(JSON.stringify(algorithm.history[num])+'<br>')
        }

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
        let window = new Window({id: 'settingsWindow', title: 'settings'})
    })
    $('#viewButton').on('click', () => { 
        let window = new Window({id: 'viewWindow', title: 'view'})
    })
})
function showSettingsButtons() {
    $('#windowButtons').css('display', 'block')
}
function openGenHistory() {
    let window = new Window({id: 'infoWindow', title: 'info'})
        // set html
        window.setHtml(`
            <span id="${window.getID()+'-generation'}">generation: ${algorithm.generation}</span><br>
            <span id="${window.getID()+'-time'}">time Running: ${(Date.now()-algorithm.startTime)/1000} Seconds</span><br>
            Generations: <div id="infoWindowGenerations" style="overflow: auto; width: 100%; height: 200px; background-color: #f2f2f2;"></div><br>
        `)
        // set generations
        for(num in algorithm.history) {
            $('#infoWindowGenerations').prepend(JSON.stringify(algorithm.history[num])+'<br>')
        }
}