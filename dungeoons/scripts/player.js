class Player {
	constructor(name) {
		this.username = name
		this.pos = new Vector()
		this.facing = 'right'
		this.weapon = 'katana'
		this.coins = 0
		this.inventory = []
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
	damage(dmg) {
		let newHealth = this.health-dmg
		this.setHealth(newHealth)
		assets.sounds.damage.volume(0.4)
		assets.sounds.damage.play()
	}
}