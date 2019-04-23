function tick() {
  if(settings.gravity != 0 && !settings.fly) {
    // if not on ground apply gravity
    if(World.player.pos.y > 0) World.player.pos.y -= settings.gravity
  }
  // Move camera
  
  // if firstPerson Set camera to player
  if(World.camera.mode == 'firstPerson') {
    World.camera.rot = World.player.rot.clone()
    World.camera.pos = World.player.pos.clone()
    World.camera.pos.y += World.player.height
  }

  World.player.pos.z += settings.speed

  // set Y depending on noise
  let yFromNoise = noise.simplex2(World.player.pos.x/terrainSize, (World.player.pos.z+50)/terrainSize)*terrainHeightStrength - 50

  let yNoiseDiff = yFromNoise-World.player.pos.y
  World.player.pos.y += yNoiseDiff/10

}


let animationCount = 0
setInterval(() => {
  animationCount++

  // Walking and sprinting and breathing animation
  if(!settings.fly && World.player.pos.y < 1) {
    if(World.player.movement.walking) {
      World.player.height = 200 - Math.cos((animationCount/20)*World.player.movement.speed)*World.player.movement.speed*10
    } else {
      World.player.height = 200 - Math.cos(animationCount/50)*5
    }
  }
}, 10)


// really slow tick that goes every second
function secondTick() {
  sleepFaces()
  loadChunks()
}

function loadChunks() {
  // loop trough objects
	let ChunkUnder = World.objects.find((e) => e.getPos().minus(World.player.pos).getMagnitude() < 5000)

	if(ChunkUnder == undefined) {
    console.log('new Chunk loaded')
    World.objects = []
    createChunk(World.player.pos.z)
  }
}

function sleepFaces() {
  // loop trough objects
	for(objectNum in World.objects) {

		let object = World.objects[objectNum]

    // loop trough faces of object
		for(faceNum in object.faces) {

			let face = object.faces[faceNum]
      let pos = face.corners[0]
      let distance = pos.clone().minus(World.player.pos).plus(new Vector(0, 0, -500)).getMagnitude()

      if(distance > settings.renderDistance) face.sleep = true
      else face.sleep = false

      if(pos.z < World.player.pos.z) face.sleep = true
    }
  }
}