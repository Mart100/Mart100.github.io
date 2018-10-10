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
            exitButton: true
        }, options)


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
            'width': '400px',
            'height': '500px',
        })
        this.applyHeadCss()

        // id draggable. Add drag ability
        if(this.drag.enabled) setTimeout(() => { this.enableDraggable() }, 10)
    }
    setHtml(html) {
        $('#'+this.id).html(`<div id="${this.id+'-head'}">${this.title}</div>`)
        this.applyHeadCss()
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
    getHtml() {
        $('#'+this.id).html()
    }
    elemToNum(elem) {
        return Number(elem.replace('px', ''))
    }
    remove() {
        $('#'+this.id).remove()
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
        $('#'+this.id+'-head').on('mouseup', () => {    
            $('body').css('cursor', 'grab')
            this.drag.holding = false
        })

        // on mouseMove
        $('body').on('mousemove', (event) => {
            // on holding
            if(this.drag.holding) $('#'+this.id).css({left: event.pageX+this.drag.offset.x, top: event.pageY+this.drag.offset.y})
        })
    }
}