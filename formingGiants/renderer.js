class Renderer {
	constructor() {

		this.canvas = document.getElementById('canvas')
		this.ctx = canvas.getContext('2d')
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight

		this.isPaused = true

		this.frame()
		
	}
	pause() {
		this.isPaused = true 
	}
	unpause() {
		this.isPaused = false
	}
	frame() {

		let ctx = this.ctx
		let canvas = this.canvas

		// rerun frame
		window.requestAnimationFrame(() => { this.frame() })

		if(this.isPaused) return
		
		// clear screen
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		// draw puppets
		for(let puppet of world.puppets) {
			ctx.fillStyle = `rgb(${puppet.color[0]}, ${puppet.color[1]}, ${puppet.color[2]})`
			ctx.beginPath()
			ctx.arc(puppet.pos.x, puppet.pos.y, puppet.size, 0, 2 * Math.PI)
			ctx.fill()
		}
	}
	
}