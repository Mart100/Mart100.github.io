let ctx, canvas
let input = {keys: {}, mouse: {movement: {x: 0, y: 0, latest: 0}, locked: false}}
let debugPanel
let frameCount = 0
let settings = {}
settings.view = 'perspective'
settings.gravity = 4
settings.fly = false
settings.collision = {}
settings.collision.floor = true
settings.strokeBlack = true
const World = {
    objects: [

    ],
    camera: {
        pos: new Vector(),
        rot: new Vector(),
        mode: 'firstPerson' // firstPerson / static / thirdperson
    },
    player: {
        height: 200,
        movement: {
            jumping: 0,
            jumpingInterval: 0,
            speed: 1,
            walking: false
        },
        pos: new Vector(0, 200, -500),
        rot: new Vector(0, 0, 0)
    }
}

$(function() {
    canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Lock mouse when click on canvas
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock
    document.addEventListener('click', () => {canvas.requestPointerLock() })

    ctx = canvas.getContext('2d')
    ctx.translate(canvas.width/2, canvas.height/2)
    ctx.miterLimit = 1
    setInterval(() => { tick() }, 10)

    // some functions
    debugPanel = new DebugPanel
    frame()
    testing()
    inputHandler()

    // house
    World.objects.push(new Cube(new Vector(-500, -1, -500), new Vector(500, 0, 500), {color: '#e00b0b', id: 'Floor'})) //Floor
    World.objects.push(new Cube(new Vector(500, 0, 500), new Vector(500, 500, -500), {color: '#32a80b', id: 'Back'})) //Back
    World.objects.push(new Cube(new Vector(500, 0, -500), new Vector(-500, 500, -500), {color: '#0936bc', id: 'SideR'})) //Side Right
    World.objects.push(new Cube(new Vector(500, 0, 500), new Vector(-500, 500, 500), {color: '#0936bc', id: 'SideL'})) //Side left
    World.objects.push(new Cube(new Vector(500, 396, -250), new Vector(-500, 1103, -250), {color: '#0936bc', id: 'roofR', rot: new Vector(-Math.PI/4, 0, 0)})) //Roof Right
    World.objects.push(new Cube(new Vector(500, 396, 250), new Vector(-500, 1103, 250), {color: '#0936bc', id: 'roofR', rot: new Vector(Math.PI/4, 0, 0)})) //Roof Left

    let roofBackCorners = [new Vector(500, 500, 500), new Vector(500, 1000, 0), new Vector(500, 500, -500)]
    let roofBackFaces = [[roofBackCorners[0], roofBackCorners[1], roofBackCorners[2]]]
    World.objects.push(new Object3D(roofBackFaces, roofBackCorners, {color: '#32a80b', id: 'BackRoof'})) //Roof Back


    World.objects.push(new Cube(new Vector(-510, 0, 500), new Vector(-500, 500, -100), {color: '#05e7fc', id: 'Front1'})) //Front1
    World.objects.push(new Cube(new Vector(-510, 0, -300), new Vector(-500, 500, -500), {color: '#05e7fc', id: 'Front2'})) //Front2

    let roofFrontCorners = [new Vector(-510, 500, 500), new Vector(-500, 1000, 0), new Vector(-500, 500, -500)]
    let roofFrontFaces = [[roofFrontCorners[0], roofFrontCorners[1], roofFrontCorners[2]]]
    World.objects.push(new Object3D(roofFrontFaces, roofFrontCorners, {color: '#05e7fc', id: 'FrontRoof'})) //Roof Front

    World.objects.push(new Cube(new Vector(-510, 300, -100), new Vector(-500, 500, -300), {color: '#05e7fc', id: 'Front3'})) //Part above door

    

    // Player cube
    let playerBodySettings = {color: '#000000', id: 'playerBody', follow: {id: 'player', rot: {y: true}}}
    World.objects.push(new Cube(new Vector(-50, 0, -50), new Vector(50, 200, 50), playerBodySettings)) //Player



    // Loop for testing
    setInterval(() => {
        debugPanel.add('Jumping', World.player.movement.jumping)
        debugPanel.add('CameraRot', JSON.stringify(World.camera.rot))
        debugPanel.add('PlayerPos', World.player.pos)
    }, 10)


})
function inputHandler() {
    // keys
    $(document).keyup(function(event) { input.keys[event.keyCode] = false })
    $(document).keydown(function(event) { input.keys[event.keyCode] = true })

    // keyPress
    $(document).keypress((event) => {
    })

    // when mouse move
    document.addEventListener("mousemove", (event) => {
        input.mouse.movement = {x: event.movementX, y: event.movementY, latest: 0}
        debugPanel.add('mouseMov', {x: event.movementX, y: event.movementY})
    })

    // on mouse lock and unlock
    if ("onpointerlockchange" in document) {
        document.addEventListener('pointerlockchange', lockChange, false)
    } else if ("onmozpointerlockchange" in document) {
        document.addEventListener('mozpointerlockchange', lockChange, false)
    }

    function lockChange() {
        if(document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) input.mouse.locked = true
        else input.mouse.locked = false
    }



    // loop
    setInterval(() => {
        let player = World.player

        player.movement.walking = false
        // keys
        // moving
        if(input.keys[87]) { // W
            let rot = player.rot.y + Math.PI/2
            let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
            vec.multiply(player.movement.speed)
            player.pos.plus(vec)
            player.movement.walking = true
        }
        if(input.keys[83]) { // S
            let rot = player.rot.y - Math.PI/2
            let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
            vec.multiply(player.movement.speed)
            player.pos.plus(vec)
            player.movement.walking = true
        }
        if(input.keys[65]) { // A
            let rot = player.rot.y
            let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
            vec.multiply(player.movement.speed)
            player.pos.plus(vec)
            player.movement.walking = true
        }
        if(input.keys[68]) { // D
            let rot = World.camera.rot.y - Math.PI
            let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
            vec.multiply(player.movement.speed)
            player.pos.plus(vec)
            player.movement.walking = true
        }
        if(input.keys[16]) { // SHIFT
            if(settings.fly) player.pos.y -= 2
            // else if fly disabled. Sprint
            else player.movement.speed = 3

        }
        if(!input.keys[16]) { // SHIFT OFF
            // stop sprint
            player.movement.speed = 1

        }
        if(input.keys[32]) { // SPACE
            // only if player is not in fly. Not jumping. and on ground
            if(!settings.fly && player.movement.jumping == 0 && player.pos.y < 1) {
                player.movement.jumping = 50
                player.movement.jumpingInterval = setInterval(() => {
                    player.pos.y += 8
                    player.movement.jumping--
                    if(player.movement.jumping == 0) clearInterval(player.movement.jumpingInterval)
                }, 10)
            }
            // if player is flying. Just go up
            if(settings.fly) player.pos.y += 2 
        }
        
        let mouseMov = input.mouse.movement

        // if mouse moved in last 10ms and mouse is locked: rotate player 
        if(mouseMov.latest < 10 && input.mouse.locked) {
            player.rot.y = ((mouseMov.x)/1000)+player.rot.y

            // x rotation
            if(mouseMov.y > 0 && player.rot.x > 0 ||
               mouseMov.y < 0 && player.rot.x < Math.PI) {
                player.rot.x = ((mouseMov.y)/-1000)+player.rot.x
            }
        }

        // update latest mouse movement
        mouseMov.latest++

    }, 1)

}
function objectByID(id) {
    return World.objects.find((a) => a.settings.id == id)
}

function testing() {
    console.log(new Cube(new Vector(6,6,6), new Vector(-10,-10,-10)).getPos())
}