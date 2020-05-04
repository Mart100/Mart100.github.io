let keys = {}
let mousePos = new Vec2(0, 0)
let renderer
let world


$(() => {

	world = new World()
	renderer = new Renderer()
	
})

function randomRGB() {
	let color = []
	color[0] = Math.floor(Math.random()*255)
	color[1] = Math.floor(Math.random()*255)
	color[2] = Math.floor(Math.random()*255)
	return color
}

async function sleep(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
}

function dgr_to_rad(degrees) {
  let pi = Math.PI
  return degrees * (pi/180)
}