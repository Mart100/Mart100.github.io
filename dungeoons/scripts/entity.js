class Entity {
  constructor(options, bound) {
    this.hittable = options.hittable || false
    this.maxhealth = options.maxhealth || 50
    this.health = options.health || this.maxhealth
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
  }
  delete() {
    let entityIdx = world.entities.indexOf(this)
    world.entities.splice(entityIdx, 1)
  }
}