class Camera {
	constructor() {
		this.pos = new Vector(0,0)
	}

	coordToWindowPos(inpos) {
		let pos = new Vector()
		pos.x = Math.floor(inpos.x-Math.floor(this.pos.x))
		pos.y = Math.floor(inpos.y-Math.floor(this.pos.y))
		return pos
	}
	windowToCoord(inpos) {
		let pos = new Vector()
		pos.x = Math.floor(inpos.x + Math.floor(this.pos.x))
		pos.y = Math.floor(inpos.y + Math.floor(this.pos.y))
		return pos
	}
}