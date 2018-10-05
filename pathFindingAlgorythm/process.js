function tick() {
    // if settings phase
    if(phase == 'settings') {
        // if holding
        if(settings.window.drag) {
            $('#settingsWindow').css({left: input.mouse.pos.x+settings.window.offset.x, top: input.mouse.pos.y+settings.window.offset.y})
        }
    }

}
