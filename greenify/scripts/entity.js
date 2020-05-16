class Entity {
	constructor(options, bound) {
		this.hittable = options.hittable || false
		this.maxhealth = options.maxhealth || 50
		this.health = options.health || this.maxhealth
		this.bloodParticles = options.bloodParticles || false
		this.pos = options.pos || new Vector()
		this.facing = 'north'
		this.hand = options.hand || 0
		this.bound = bound
		this.sprite = options.sprite || 'stone'
		world.entities.push(this)
		this.events = new EventSystem(this)
	}
	delete() {
		let entityIdx = world.entities.indexOf(this)
		world.entities.splice(entityIdx, 1)
	}
	draw() {
		
		this.drawHand()
		this.drawEntity()

	}
	drawEntity() {
		let ctx = ctxList['entities']
		let image = assets.images.entities[this.sprite][this.facing][Math.floor(world.tickCount/20) % 2]
		let pos = world.camera.coordToWindowPos(this.pos)
		let imageWidth = image.width*4
		let imageHeight = image.height*4
		ctx.drawImage(image, pos.x-imageWidth/2, pos.y-imageHeight/2, imageWidth, imageHeight)
	}
	drawHand() {
		let ctx = ctxList['entities']
		let handImagePos = world.camera.coordToWindowPos(this.pos)
		let handImageRotation = 0
		let flipped = false
		if(this.facing == 'north') { handImagePos.plus(new Vector(-30, 20)); flipped = true; handImageRotation = 0 }
		if(this.facing == 'east') { handImagePos.plus(new Vector(30, 20)); handImageRotation = 0 }
		if(this.facing == 'south') { handImagePos.plus(new Vector(30, 20)); handImageRotation = 0; }
		if(this.facing == 'west') { handImagePos.plus(new Vector(-30, 20)); flipped = true; handImageRotation = 0 }

		let handImage = assets.images.items[this.hand +(flipped ? '_flipped' : '')]
		
		handImageRotation += Math.sin(world.tickCount/10)*30
		if(Math.floor(world.tickCount/20) % 2 == 1) handImagePos.plus(new Vector(0, -5))
		let handImageWidth = handImage.width*2
		let handImageHeight = handImage.height*2
		ctx.save()
		ctx.translate(handImagePos.x, handImagePos.y)
		ctx.rotate(handImageRotation*Math.PI/180)
		ctx.drawImage(handImage, -handImageWidth/2, -handImageHeight/2, handImageWidth, handImageHeight)
		ctx.restore()
	}
}