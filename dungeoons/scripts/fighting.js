function attack(pos) {
	if(world.animations.katanaswing != 0) return

	// play sound
	assets.sounds.swordswing.volume(0.3)
	assets.sounds.swordswing.play()

	// change player facing
	let mpos = pos.clone().minus(world.player.pos)
	if(mpos.x > 0.5) world.player.facing = 'right'
	if(mpos.x < -0.5) world.player.facing = 'left'
	if(mpos.y > 0.5) world.player.facing = 'down'
	if(mpos.y < -0.5) world.player.facing = 'up'

	// play animation
	world.animations.katanaswing = 0
	let i = 0
	let aniloop = setInterval(() => {
		i++
		let y = (Math.sin((i-5)/10)*100)-30
		if(y < 0) y *= 0.8
		world.animations.katanaswing = y
		if(i > 35) {
			clearInterval(aniloop)
			world.animations.katanaswing = 0
		}
	}, 2)

	//new Particle(pos)
	
	// damage entities
	for(let e of world.entities) {
		if(!e.hittable) continue
		let dist = pos.clone().minus(e.pos).getMagnitude()
		let damageAmount = Math.round(10 + (Math.random()*10))
		if(dist < 1) e.damage(damageAmount, pos)
	}
}