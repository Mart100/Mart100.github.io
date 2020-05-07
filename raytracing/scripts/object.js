class Object {
	constructor() {
		this.pos = new Vector(0, 0, 0)
		this.color = [0, 0, 0]
		this.reflection = 0.5
		this.shape = 'ball'
		this.size = new Vector(100, 100, 100)
	}
	load() {
		world.addObject(this)
	}
	remove() {
		let idx = world.objects.indexOf(this)
		if(idx != -1) world.objects.splice(idx, 1)
	}
}