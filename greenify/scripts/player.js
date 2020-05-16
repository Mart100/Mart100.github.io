class Player extends Entity {
	constructor(name) {
		super({pos: new Vector(window.innerWidth/2, window.innerHeight/2), sprite: 'player', hand: 'watering_can'})
		this.username = name
		this.coins = 0
		this.inventory = ['watering_can', 'seeds', 'seeds']
	
	}
	use(pos) {
		if(this.hand == 'watering_can') {

			let ppos = this.pos.clone()

			if(this.facing == 'north') ppos.plus(new Vector(-40, 20))
			if(this.facing == 'east') ppos.plus(new Vector(40, 20))
			if(this.facing == 'south') ppos.plus(new Vector(40, 20))
			if(this.facing == 'west') ppos.plus(new Vector(-40, 20))

			let particleBundleOptions = {
				pos: ppos.clone(),
				amount: 2,
				colorRange: [[100, 100, 200, 0.6], [200, 200, 255, 1]],
				sizeRange: [5, 10],
				velocitySpeedRange: [0, 8],
				velocityAngleRange: [new Vector(-1, -1), new Vector(1, 1)],
				extraParticleSettings: {
					slowDownSpeed: 100,
					duration: 600,
					gravity: true,
					fadeAway: true,
					velocityTime: 400
				}
			}
			let pb = new ParticleBundle(particleBundleOptions)
			pb.play()

			// actually green the ground
			let landPos = ppos.clone().plus(new Vector(0, 30)).round()
			let gridPos = world.grid.worldToGrid(landPos)
			let radius = 5
			for(let x=gridPos.x-radius;x<gridPos.x+radius;x++) {
				for(let y=gridPos.y-radius;y<gridPos.y+radius;y++) {
					let pos = new Vector(x, y)
					let dist = gridPos.clone().minus(pos).getMagnitude()
					if(dist > radius) continue
					let tile = world.grid.getTile(x, y)
					if(!tile) {
						world.grid.createTile(x, y)
						tile = {naturity: 0}
					}
					let oldnaturity = tile.naturity
					let newNaturity = oldnaturity+(Math.random()*((radius-dist)/1000))
					if(newNaturity > 1) newNaturity = 1
					world.grid.setTileProperty(pos.x, pos.y, 'naturity', newNaturity)
				}
			}
			
		}
	}
	setHealth(to) {
		this.health = to
		setHealthHUD(to)
	}
	heal(amount) {
		let newHealth = this.health+amount
		if(newHealth > this.maxHealth) newHealth = this.maxHealth
		this.setHealth(newHealth)
	}
	death() {
		this.health = 0
	}
	damage(dmg) {
		let newHealth = this.health-dmg
		this.setHealth(newHealth)
		if(this.health <= 0) this.death()
		assets.sounds.damage.volume(0.2)
		assets.sounds.damage.play()
	}
	applyEffect(type, strength, time) {
		if(this.effects.find(e => e.type == type)) return 0
		let effect = this.effects.push({type, strength, time})
		setTimeout(() => {
			let idx = this.effects.indexOf(effect)
			this.effects.splice(idx, 1)
		}, time)
		return 1
	}
}