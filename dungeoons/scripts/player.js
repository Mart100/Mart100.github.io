class Player {
	constructor(name) {
		this.username = name
		this.pos = new Vector()
		this.facing = 'right'
		this.weapon = 'katana'
		this.coins = 0
		this.effects = []
		this.hotbar = []
		this.inventory = ['bandages', 'speed-potion', 'bandages', 'speed-potion', 'grenade', 'grenade']
		this.maxHealth = 100
		this.health = this.maxHealth
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