class Window {
    constructor(options) {
        // if no custom id
        if(options == undefined || options.id == undefined) return console.log('Please specify a window ID')

        // default settings + own options
        Object.assign(this, {
            id: 'window',
            title: 'unknown',
            drag: {
                enabled: true,
                holding: false,
                offset: {x: 0, y: 0},
            },
            size: {width: 'auto', height: 'auto'},
            resizable: false,
            exitButton: true
        }, options)
        
        // if already exists
        if($('#'+this.id)[0] != undefined) return


        // create the window
        $('body').append(`
        <div id="${this.id}" style="left: ${window.innerWidth/2-200}px; top: ${window.innerHeight/2-250}px;">
            <div id="${this.id+'-head'}">${this.title}</div>
        </div>
        `)

        // set css of window
        $('#'+this.id).css({
            'position': 'absolute',
            'box-shadow': '25px 25px 41px -5px rgba(0,0,0,0.83)',
            'background-color': 'white',
            'border-radius': '10px',
            'width': this.size.width,
            'height': this.size.height,
        })
        this.applyHeadCss()

        // if draggable. Add drag ability
        if(this.drag.enabled) setTimeout(() => { this.enableDraggable() }, 10)

        // if exitButton Add it
        if(this.exitButton) this.addExitButton()

        if(this.resizable) this.enableResizable()
    }
    setHtml(html) {
        $('#'+this.id).html(`<div id="${this.id+'-head'}">${this.title}</div>`)
        this.applyHeadCss()
        if(this.exitButton) this.addExitButton()
        if(this.drag.enabled) setTimeout(() => { this.enableDraggable() }, 10)
        $('#'+this.id).append(html)

    }
    applyHeadCss() {
        // set css of windowHead
        $('#'+this.id+'-head').css({
            'position': 'relative',
            'top': '0px',
            'width': '100%',
            'height': '35px',
            'background-color': '#cecece',
            'border-radius': '10px 10px 0px 0px',
            'font-size': '35px',
            'user-select': 'none',
            'text-align': 'center',
            'padding': '15px 0px 15px 0px',
        })
    }
    getID() {
        return this.id
    }
    getHtml() {
        $('#'+this.id).html()
    }
    elemToNum(elem) {
        return Number(elem.replace('px', ''))
    }
    remove() {
        $('#'+this.id).remove()
    }
    enableResizable() {
        // on mouseMove
        $('#'+this.id).on('mousemove', (event) => {
            let windowLeft = this.elemToNum($('#'+this.id).css('left'))
            let windowtop = this.elemToNum($('#'+this.id).css('top'))
            //$('body').css('cursor', 'default')
            // if left side
            if(event.pageX > windowLeft-10 && event.pageX < windowLeft+10) {
                $('body').css('cursor', 'e-resize')
            }
        })
    }
    enableDraggable() {
        this.drag.enabled = true

        // on mouseDown
        $('#'+this.id+'-head').on('mousedown', () => {  
            $('body').css('cursor', 'grabbing')
            this.drag.offset = {x: this.elemToNum($('#'+this.id).css('left'))-input.mouse.pos.x, y: this.elemToNum($('#'+this.id).css('top'))-input.mouse.pos.y}
            this.drag.holding = true
        })
        // on mouseUp
        $('body').on('mouseup', () => {    
            if(this.drag.holding) $('body').css('cursor', 'grab')
            this.drag.holding = false
        })
        // on mouseLeave
        $('#'+this.id+'-head').on('mouseleave', () => { 
            $('body').css('cursor', 'default')
        })
        // on mouse enter
        $('#'+this.id+'-head').on('mouseenter', () => { 
            $('body').css('cursor', 'grab')
        })
        // on mouseMove
        $('body').on('mousemove', (event) => {
            // on holding
            if(this.drag.holding) $('#'+this.id).css({left: event.pageX+this.drag.offset.x, top: event.pageY+this.drag.offset.y})
        })
    }
    addExitButton() {
        $('#'+this.id+'-head').append(`<div id="${this.id+'-exit'}">X</div>`)
        $('#'+this.id+'-exit').css({
            'float': 'right',
            'margin': '0px 10px',
            'background-color': 'white',
            'border-radius': '5px',
            'cursor': 'pointer',
            'width': '35px',
            'height': '35px',
            'font-size': '30px',
            'transition': 'background-color .3s '
            
        })
        $('#'+this.id+'-exit').on('mouseenter', function() {
            $(this).css('background-color', '#e0e0e0')
        }).on('mouseleave', function() {
             $(this).css('background-color', 'white')
        })
        $('#'+this.id+'-exit').on('click', () => {
            this.remove()
        })
    }
}