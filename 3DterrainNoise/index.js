let ctx, canvas
let input = {keys: {}, mouse: {movement: {x: 0, y: 0, latest: 0}, locked: false}}
let debugPanel
let frameCount = 0
let settings = {}
settings.view = 'perspective'
settings.gravity = 4
settings.fly = true
settings.renderDistance = 2000
settings.collision = {}
settings.speed = 10
settings.collision.floor = true
settings.strokeBlack = false
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
			speed: 5,
			walking: false
		},
		pos: new Vector(0, -150, -500),
		rot: new Vector(1.3, 0, 0)
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
	setInterval(() => { secondTick() }, 1000)

	// some functions
	debugPanel = new DebugPanel
	frame()
	testing()
	inputHandler()
	createChunk()



	// Loop for testing
	setInterval(() => {
		debugPanel.add('CameraRot', JSON.stringify(World.camera.rot))
		debugPanel.add('PlayerPos', World.player.pos)
	}, 10)


})

function objectByID(id) {
	return World.objects.find((a) => a.settings.id == id)
}

function testing() {
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomRGB() {
	return `rgba(${randomRange(0, 255)}, ${randomRange(0, 255)}, ${randomRange(0, 255)}, 1)`
}