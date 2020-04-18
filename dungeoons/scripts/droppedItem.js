class DroppedItem {
  constructor(pos, itemType) {
    this.pos = pos
    this.itemType = itemType
    this.entity = new Entity({pos: pos, hittable: false})
    world.droppedItems.push(this)

  }
  checkPickup() {
    let distance = world.player.pos.clone().minus(this.pos).getMagnitude()
    if(distance < 0.5) this.pickup()
  }
  pickup() {
    assets.sounds.pickup.play()
    new Particle(this.pos.clone().minus(new Vector(0, 0.4)), {text: `+ ${this.itemType}`, color: [50, 255, 50, 1]})
    world.player.inventory.push(this.itemType)
    this.delete()
    updateHotbar()
  }
  delete() {
    let idx = world.droppedItems.indexOf(this)
    world.droppedItems.splice(idx, 1)
    this.entity.delete()
  }

}