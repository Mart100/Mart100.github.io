class Chest {
  constructor(pos) {

    this.pos = pos.clone()

    let entityOptions = {
      hittable: true,
      maxhealth: 10,
      pos: this.pos.clone()
    }
    this.entity = new Entity(entityOptions)
    

    this.eventListeners()
  }
  eventListeners() {
    this.entity.events.on('death', (entity) => {
      console.log('DEAD')
      this.dropLoot()
      this.delete()
    })
  }
  dropLoot() {
    let itemAmount = Math.floor(Math.random()*7)+3
    let possibleItems = ['bandages', 'katana', 'speed-potion', 'grenade']
    let items = []
    for(let i=0;i<itemAmount;i++) items.push(possibleItems[Math.floor(Math.random()*possibleItems.length)])
    for(let i of items) {
      let itemPos = this.pos.clone().plus(new Vector().randomize(1))
      new DroppedItem(itemPos, i)
    }
    
  }
  delete() {
    let tile = world.grid.getTile(this.pos.x, this.pos.y)
    tile.objectType = ''
    tile.object = ''

    this.entity.delete()
  }
}