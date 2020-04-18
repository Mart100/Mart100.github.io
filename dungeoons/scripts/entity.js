class Entity {
  constructor(options, bound) {
    this.hittable = options.hittable || false
    this.maxhealth = options.maxhealth || 50
    this.health = options.health || this.maxhealth
    this.bloodParticles = options.bloodParticles || false
    this.pos = options.pos || new Vector()
    this.bound = bound
    world.entities.push(this)
    this.events = new EventSystem(this)
  }
  damage(dmg) {
    this.health -= dmg
    let hitmarkerPos = this.pos.clone().plus(new Vector().randomize(1))
    world.rendering.addHitmarker(dmg, hitmarkerPos)
    assets.sounds.swordhit.volume(0.3)
    assets.sounds.swordhit.play()
    this.events.emit('damage')
    if(this.health < 0) this.events.emit('death')
    if(this.bloodParticles) this.createBloodParticles()
  }
  createBloodParticles() {
    let explosionParticleBundleOptions = {
			pos: this.pos.clone(),
			amount: 10,
			colorRange: [[100, 0, 0, 0.4], [255, 0, 0, 0.8]],
			sizeRange: [5, 10],
			velocitySpeedRange: [10, 50],
			extraParticleSettings: {
				slowDownSpeed: 100,
        duration: 1500,
        gravity: true,
        fadeAway: true,
        velocityTime: 750
			}
		}
		let pb = new ParticleBundle(explosionParticleBundleOptions)
		pb.play()
  }
  delete() {
    let entityIdx = world.entities.indexOf(this)
    world.entities.splice(entityIdx, 1)
  }
}