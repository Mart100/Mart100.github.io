function throwGrenade() {
	let pos = world.player.pos.clone()
	let halfWindow = world.rendering.windowSize.clone().divide(2)
	let velocity = mousePos.clone().minus(halfWindow).divide(50)
	let image = assets.images.items.grenade
	inMouseHand = 'none'
	let pOptions = {
		image: image, 
		velocity: velocity, 
		size: 32, 
		velocitySlowDown: true, 
		duration: 1250, 
		slowDownSpeed: 50,
		minimumSlowSpeed: 0.25,
		collision: true
	}

	let particle = new Particle(pos, pOptions)
	assets.sounds.grenadeland.play()
	particle.events.on('velocitySlowedDown', (p) => {
		p.addExtraRendering((rendering, p, pos) => {
			rendering.ctx.beginPath()
			rendering.ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'
			rendering.ctx.arc(pos.x, pos.y, 400, 0, 2 * Math.PI)
			rendering.ctx.fill()
		})
	})
	particle.events.on('decayed', (p) => {
		assets.sounds.explosion.play()
		let explosionParticleBundleOptions = {
			pos: particle.pos.clone(),
			amount: 500,
			colorRange: [[0, 0, 0, 0], [255, 0, 0, 1]],
			sizeRange: [5, 30],
			velocitySpeedRange: [10, 350],
			extraParticleSettings: {
				slowDownSpeed: 1000,
				duration: 500,
				fadeAway: true,
				collision: true
			}
		}
		let pb = new ParticleBundle(explosionParticleBundleOptions)
		pb.play()
		
		// damage entities
		for(let e of world.entities) {
			if(!e.hittable) continue
			let dist = particle.pos.clone().minus(e.pos).getMagnitude()
			let damageAmount = Math.round(75 + (Math.random()*100))
			if(dist < 4) e.damage(damageAmount)
		}
	})
}