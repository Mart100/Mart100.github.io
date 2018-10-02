let canvas, ctx
let grid = []
let gridSize = {x: 200, y: 100}
let input = {mouse: {down: {left: false, right: false}, pos: {x: 0, y: 0}}}
let settings = {speed: 100, toggles: {draw: false, pause: false}}
let processInterval



$(() => {
    // new grid
    createGrid()
    
    // setup canvas
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // styles
    ctx.fillStyle = '#000000'
    setInterval(() => { frame() }, 1000/60)
    processInterval = setInterval(() => { tick() }, settings.speed)
})