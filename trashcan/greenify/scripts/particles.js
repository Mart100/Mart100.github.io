class Particle {
	constructor(pos, options) {
		if(options == undefined) options = {}
		this.pos = pos.clone()
		this.size = options.size || 5
		this.duration = options.duration || 2000
		this.text = options.text
		this.textSize = options.textSize || 20
		this.color = options.color || [255, 0, 0, 1]
		this.startColor = this.color.slice()
		this.velocity = options.velocity
		this.velocitySlowDown = options.velocitySlowDown || false
		this.slowDownSpeed = 1/options.slowDownSpeed || 0.005
		this.destroyOnStop = options.destroyOnStop || false
		this.minimumSlowSpeed = options.minimumSlowSpeed || 0.01
		this.gravity = options.gravity || 0
		this.velocityTime = options.velocityTime || 0
		this.image = options.image
		this.collision = options.collision || false
		this.events = new EventSystem(this)
		this.destroyed = false
		this.created = Date.now()
		this.fadeAway = options.fadeAway || false
		
		world.particles.push(this)
		setTimeout(() => { this.destroy() }, this.duration)
	}
	tick() {
		let now = Date.now()
		if(this.velocity) {
			let addVelocity = true
			if(this.velocityTime && this.velocityTime < now-this.created) addVelocity = false
			let movement = this.velocity.clone().divide(1)

			if(addVelocity) this.pos.plus(movement)

			// gravity
			if(this.gravity) {
				this.velocity.plus(new Vector(0, 0.05))
			}

			// slow down // resistance
			if(this.velocitySlowDown) {
				this.velocity.divide(1+this.slowDownSpeed)
				let magnitude = this.velocity.getMagnitude()
				if(magnitude < this.minimumSlowSpeed && magnitude != 0) {
					this.events.emit('velocitySlowedDown')
					this.velocity = new Vector(0, 0)
					if(this.destroyOnStop) this.destroy()
				}
			}
		}
		if(this.fadeAway) {
			this.color[3] = this.startColor[3]*(1-((now-this.created)/this.duration))
		}

	}
	destroy() {
		if(this.destroyed) return
		this.events.emit('decayed')
		let idx = world.particles.indexOf(this)
		if(idx > -1) world.particles.splice(idx, 1)
		delete this.events
		this.destroyed = true
		delete this
	}
	addExtraRendering(func) {
		this.extraRenderingFunc = func
	}
}

class ParticleBundle {
	constructor(options={}) {
		this.pos = options.pos || world.grid.windowToGridPos(world.rendering.windowSize.clone().divide(2))
		this.amount = options.amount || 100
		this.sizeRange = options.sizeRange || [10, 20]
		this.colorRange = options.colorRange || [[0, 0, 0, 0], [255, 255, 255, 1]]
		this.velocityAngleRange = options.velocityAngleRange || [new Vector(-1, -1), new Vector(1, 1)]
		this.velocitySpeedRange = options.velocitySpeedRange || [5, 25]
		this.extraParticleSettings = options.extraParticleSettings || {}

		this.particles = []
	}
	play() {
		this.particles = []
		for(let i=0;i<this.amount;i++) {
			let pPos = this.pos
			let pOptions = this.generateParticleSettings()
			let particle = new Particle(pPos, pOptions)
			this.particles.push(particle)
		}
	}
	generateParticleSettings() {
		let pOptions = {}

		pOptions.size = Math.floor(getRandom(this.sizeRange[0], this.sizeRange[1]))

		pOptions.color = []
		pOptions.color[0] = Math.floor(getRandom(this.colorRange[0][0], this.colorRange[1][0]))
		pOptions.color[1] = Math.floor(getRandom(this.colorRange[0][1], this.colorRange[1][1]))
		pOptions.color[2] = Math.floor(getRandom(this.colorRange[0][2], this.colorRange[1][2]))
		pOptions.color[3] = getRandom(this.colorRange[0][3], this.colorRange[1][3])
		//pOptions.color = `rgba(${pOptions.color[0]}, ${pOptions.color[1]}, ${pOptions.color[2]}, ${pOptions.color[3]})`

		pOptions.velocity = new Vector()
		pOptions.velocity.x = getRandom(this.velocityAngleRange[0].x, this.velocityAngleRange[1].x)
		pOptions.velocity.y = getRandom(this.velocityAngleRange[0].y, this.velocityAngleRange[1].y)

		pOptions.velocity.setMagnitude(getRandom(this.velocitySpeedRange[0], this.velocitySpeedRange[1]))
		pOptions.velocity.divide(10)

		pOptions.velocitySlowDown = true
		pOptions.destroyOnStop = true

		pOptions = {...pOptions, ...this.extraParticleSettings}

		return pOptions
	}

}