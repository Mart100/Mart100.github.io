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

$(() => {
	canvas = document.getElementById('canvas')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	// Lock mouse when click on canvas
	canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock
	canvas.addEventListener('click', () => {canvas.requestPointerLock() })

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
	new Cube(new Vector(-500, -1, -500), new Vector(500, 0, 500), {color: '#e00b0b', id: 'Floor'}) //Floor
	new Cube(new Vector(500, 0, 500), new Vector(500, 500, -500), {color: '#32a80b', id: 'Back'}) //Back
	new Cube(new Vector(500, 0, -500), new Vector(-500, 500, -500), {color: '#0936bc', id: 'SideR'}) //Side Right
	new Cube(new Vector(500, 0, 500), new Vector(-500, 500, 500), {color: '#0936bc', id: 'SideL'}) //Side left
	new Cube(new Vector(500, 396, -250), new Vector(-500, 1103, -250), {color: '#0936bc', id: 'roofR', rot: new Vector(-Math.PI/4, 0, 0)}) //Roof Right
	new Cube(new Vector(500, 396, 250), new Vector(-500, 1103, 250), {color: '#0936bc', id: 'roofR', rot: new Vector(Math.PI/4, 0, 0)}) //Roof Left

	let roofBackCorners = [new Vector(500, 500, 500), new Vector(500, 1000, 0), new Vector(500, 500, -500)]
	let roofBackFaces = [[roofBackCorners[0], roofBackCorners[1], roofBackCorners[2]]]
	new Object3D(roofBackFaces, roofBackCorners, {color: '#32a80b', id: 'BackRoof'}) //Roof Back


	new Cube(new Vector(-510, 0, 500), new Vector(-500, 500, -100), {color: '#05e7fc', id: 'Front1'}) //Front1
	new Cube(new Vector(-510, 0, -300), new Vector(-500, 500, -500), {color: '#05e7fc', id: 'Front2'}) //Front2

	let roofFrontCorners = [new Vector(-510, 500, 500), new Vector(-500, 1000, 0), new Vector(-500, 500, -500)]
	let roofFrontFaces = [[roofFrontCorners[0], roofFrontCorners[1], roofFrontCorners[2]]]
	new Object3D(roofFrontFaces, roofFrontCorners, {color: '#05e7fc', id: 'FrontRoof'}) //Roof Front

	new Cube(new Vector(-510, 300, -100), new Vector(-500, 500, -300), {color: '#05e7fc', id: 'Front3'}) //Part above door

	

	// Player cube
	let playerBodySettings = {color: '#000000', id: 'playerBody', follow: {id: 'player', rot: {y: true}}}
	new Cube(new Vector(-50, 0, -50), new Vector(50, 200, 50), playerBodySettings) //Player



	// Loop for testing
	setInterval(() => {
		debugPanel.add('Jumping', World.player.movement.jumping)
		debugPanel.add('CameraRot', JSON.stringify(World.camera.rot))
		debugPanel.add('PlayerPos', World.player.pos)
	}, 10)


})

function objectByID(id) {
	return World.objects.find((a) => a.settings.id == id)
}

function testing() {
	console.log(new Cube(new Vector(6,6,6), new Vector(-10,-10,-10)).getPos())
}