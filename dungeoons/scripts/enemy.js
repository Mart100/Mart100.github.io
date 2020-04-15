class Enemy {
	constructor(pos, options) {
		this.pos = pos  
		this.type = options.type
		this.facing = 'right'
		this.path = null
		this.pathTarget = null

		this.entity = new Entity({pos: pos, hittable: true, maxhealth: 40, bound: this})

		this.pathfinder = new Pathfinder()
		this.noticeRange = 8
		this.speed = options.speed || 20
		this.speed /= 1000
		this.lastPlayerHit = Date.now()

		world.enemies.push(this)

		this.eventListeners()

	}
	async setPlayerTarget() {
		if(!this.pathfinder.foundEnd) return
		let path = await this.pathfinder.findPath(this.pos.clone().round(), world.player.pos.clone().round())
		this.path = path
		this.pathTarget = new Vector(this.path[this.path.length-1].x, this.path[this.path.length-1].y)
	}
	tryDamagePlayer() {
		let enemyToPlayerVec = world.player.pos.clone().minus(this.pos)
		let enemyToPlayerMagnitude = enemyToPlayerVec.getMagnitude()

		if(enemyToPlayerMagnitude > 0.3) return

		if(Date.now()-this.lastPlayerHit < 500) return

		world.player.damage(10)
		this.lastPlayerHit = Date.now()
	}
	move() {
		let enemyToPlayerVec = world.player.pos.clone().minus(this.pos)
		let enemyToPlayerMagnitude = enemyToPlayerVec.getMagnitude()
		let movement = new Vector(0, 0)
		if(this.path == null) {
			if(enemyToPlayerMagnitude < this.noticeRange) {
				if(enemyToPlayerMagnitude > 3) {
					return this.setPlayerTarget()
				} else {
					movement = enemyToPlayerVec.setMagnitude(this.speed)
				}
			}
			else return
			
		} else {
			let enemyToTargetMagnitude = this.pathTarget.clone().minus(world.player.pos).getMagnitude()
			if(enemyToTargetMagnitude > 3) {
				if(enemyToPlayerMagnitude < this.noticeRange*1.5) {
					if(this.path.length < 10) return this.setPlayerTarget()
				} else {
					return this.path = null
				}
				
			}
			let segment = this.path[0]
			if(!segment) return this.path = null
			let enemyToPlayerVec = this.pos.clone().minus(world.player.pos)
			movement = new Vector(segment.x, segment.y).minus(this.pos).plus(enemyToPlayerVec.setMagnitude(0.1))
			let magnitude = movement.getMagnitude()
			if(magnitude > this.speed) movement.setMagnitude(this.speed)
			if(magnitude < 0.2) {
				this.path.shift()
				if(this.path.length == 1) this.path = null
			}
		}

		if(enemyToPlayerMagnitude < 0.3) movement = new Vector(0,0)

		this.pos.x += movement.x
		this.pos.y += movement.y

	}
	eventListeners() {
		this.entity.events.on('death', (entity) => {
			this.delete()
		})
	}
	delete() {
		let idx = world.enemies.indexOf(this)
		world.enemies.splice(idx, 1)
		this.entity.delete()
	}
}