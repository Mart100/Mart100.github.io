class RenderEngine {
	constructor(world) {
		this.world = world
		this.canvas = document.getElementById('canvas')
		this.ctx = this.canvas.getContext('2d')
	
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight

		this.ctx.mozImageSmoothingEnabled = false
		this.ctx.imageSmoothingEnabled = false

		this.windowSize = new Vector(window.innerWidth, window.innerHeight)
		this.zoom = settings.zoom

		this.hitmarkers = []
	}
	drawFrame() {

		stats.begin()

		// clear screen
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		let facing = this.world.player.facing

		this.drawGrid()

		this.drawDroppedItems()

		this.drawEnemies()

		if(facing == 'down' || facing == 'left') {
			this.drawPlayer()
			this.drawWeapon()
		} else {
			this.drawWeapon()
			this.drawPlayer()
		}

		this.drawParticles() 
		this.drawHitmarkers()

		stats.end()

		// rerun frame
		window.requestAnimationFrame(() => { this.drawFrame() })
		
	}
	drawDroppedItems() {
		this.ctx.save()
		this.ctx.shadowOffsetX = 5
		this.ctx.shadowOffsetY = 5
		this.ctx.shadowColor = 'black'
		this.ctx.shadowBlur = 10
		for(let itemIdx in world.droppedItems) {
			let item = world.droppedItems[itemIdx]

			let itempos = world.grid.gridToWindowPos(item.pos)
			let itemType = item.itemType
			let itemImage = assets.images.items[itemType] || assets.images.weapons[itemType]
			this.ctx.drawImage(itemImage, itempos.x-16, itempos.y-16, 32, 32)

		}
		this.ctx.restore()
	}
	addHitmarker(dmg, pos) {
		let hitmarker = {
			dmg: dmg,
			pos: pos,
			t: Date.now()
		}
		this.hitmarkers.push(hitmarker)
	}
	drawEnemies() {
		this.ctx.save()
		this.ctx.shadowOffsetX = 10
		this.ctx.shadowOffsetY = 10
		this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
		this.ctx.shadowBlur = 20
		for(let enemyIdx in world.enemies) {
			let enemy = world.enemies[enemyIdx]
			let enemyPos = world.grid.gridToWindowPos(enemy.pos)
			if(enemyPos.x < 0 || enemyPos.x > this.windowSize.x || enemyPos.y < 0 || enemyPos.y > this.windowSize.y) continue
			let enemyType = enemy.type
			let enemyFacing = enemy.facing
			let enemyImage = assets.images.enemies[enemyType][enemyFacing]
			let enemyWidth = enemyImage.width*4
			let enemyHeight = enemyImage.height*4
			this.ctx.drawImage(enemyImage, enemyPos.x-enemyWidth/2, enemyPos.y-enemyHeight/2, enemyWidth, enemyHeight)
			if(settings.drawPathfinding) {
				if(enemy.path) {
					let path = enemy.path
					this.ctx.strokeStyle = 'rgb(0, 255, 0)'
					this.ctx.beginPath()
					for(let i in path) {
						let seg = path[i]
						let screenPos = world.grid.gridToWindowPos(new Vector(seg.x, seg.y))
						if(i == 0) this.ctx.moveTo(screenPos.x, screenPos.y)
						else this.ctx.lineTo(screenPos.x, screenPos.y)
					}
					this.ctx.stroke()
				}
			}
		}
		this.ctx.restore()
	}
	drawHitmarkers() {
		let now = Date.now()
		this.ctx.font = "30px Arial"
		this.ctx.textAlign = "center"
		this.ctx.textBaseline = "middle"
		for(let hi in this.hitmarkers) {
			let h = this.hitmarkers[hi]
			if(now-h.t > 2000) { this.hitmarkers.splice(hi, 1); continue }
			let age = now-h.t
			let hpos = this.world.grid.gridToWindowPos(h.pos)
			this.ctx.fillStyle = `rgba(200, 50, 50, ${1-(age/2000)})`
			this.ctx.fillText(`${h.dmg}`, hpos.x, hpos.y-age/100)

		}
	}
	drawParticles() {
		let pp = this.world.player.pos
		for(let p of this.world.particles) {
			this.ctx.beginPath()
			this.ctx.fillStyle = p.color || 'rgb(255, 0, 0)'
			let posx = (((p.pos.x)-pp.x)*this.zoom)+this.windowSize.x/2
			let posy = (((p.pos.y)-pp.y)*this.zoom)+this.windowSize.y/2
			if(p.text) {
				this.ctx.font = `${p.textSize}px Arial`
				this.ctx.textAlign = "center"
				this.ctx.textBaseline = "middle"
				
				this.ctx.fillText(`${p.text}`, posx-p.size/2, posy-p.size/2)
			} else {
				this.ctx.fillRect(posx-p.size/2, posy-p.size/2, p.size, p.size)
			}
			
		}
	}
	drawWeapon() {
		let facing = this.world.player.facing
		let weapon = this.world.player.weapon
		let weaponImage = assets.images.weapons[weapon]

		let w = this.canvas.width
		let h = this.canvas.height

		let katanaPos = new Vector(w/2, h/2)
		let rotate = 0
		let size = 2

		let katanaWidth = 32*size
		let katanaHeight = 32*size

		if(facing == 'right') { katanaPos.plus(new Vector(10, -18)); rotate = 0 }
		if(facing == 'left') { katanaPos.plus(new Vector(10, -18)); rotate = 270 }
		if(facing == 'up') { katanaPos.plus(new Vector(-10, -18)); rotate = 290 }
		if(facing == 'down') { katanaPos.plus(new Vector(10, -18)); rotate = -20; }

		if(world.animations.katanaswing) {
			if(facing == 'right') rotate += world.animations.katanaswing*1.5
			if(facing == 'left') rotate -= world.animations.katanaswing*1.5
			if(facing == 'down') rotate += (world.animations.katanaswing+40)*2
			if(facing == 'up') rotate += world.animations.katanaswing*1.5
		}

		katanaPos.minus(new Vector(0, katanaHeight/2))

		rotate += Math.sin(world.tickCount/50)*2

		this.ctx.save()
		this.ctx.translate(katanaPos.x, katanaPos.y+katanaHeight)
		this.ctx.rotate(rotate*Math.PI/180)
		this.ctx.drawImage(weaponImage, 0, -katanaHeight, katanaWidth, katanaHeight)
		this.ctx.restore()
	}
	drawPlayer() {
		this.ctx.save()
		this.ctx.shadowOffsetX = 10
		this.ctx.shadowOffsetY = 10
		this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
		this.ctx.shadowBlur = 20
		let facing = this.world.player.facing
		let playerImage = assets.images.player[facing]
		let w = this.canvas.width
		let h = this.canvas.height
		let playerImgSize = {x: 10, y: 18}
		let playerWidth = playerImgSize.x*settings.playerSize
		let playerHeight = playerImgSize.y*settings.playerSize

		this.ctx.drawImage(playerImage, w/2-(playerWidth/2), h/2-(playerHeight/2), playerWidth, playerHeight)
		this.ctx.restore()
	}
	drawGrid() {
		let pp = this.world.player.pos
		let ppr = new Vector()
		ppr.x = Math.round(pp.x)
		ppr.y = Math.round(pp.y)
		let ptileoffx = this.world.player.pos.x % 1
		let ptileoffy = this.world.player.pos.y % 1

		for(let x=ppr.x-10;x<ppr.x+11;x++) {
			for(let y=ppr.y-5;y<ppr.y+6;y++) {
				let tile = this.world.grid.getTile(x, y)
				if(!tile) {
					this.world.grid.createTile(x, y)
					continue
				}

				let imageSize = 32
				let size = imageSize*3
				
				let posX = (((tile.x-pp.x)*size)-size/2)+this.canvas.width/2
				let posY = (((tile.y-pp.y)*size)-size/2)+this.canvas.height/2

				if(tile.ground != 'empty') {
					// draw tiles
					let groundImage = assets.images.ground[tile.ground]
					if(!settings.gridLines) this.ctx.drawImage(groundImage, posX-0.5, posY-0.5, size+1, size+1)
					else this.ctx.drawImage(groundImage, posX+1, posY+1, size-2, size-2)
	
				}

				// draw walls
				if(tile.walls.length > 0) {
					for(let wall of tile.walls) {
						let img = assets.images.walls[wall]
						let posX = (((tile.x-pp.x)*size)-size/2)+this.canvas.width/2
						let posY = (((tile.y-pp.y)*size)-size/2)+this.canvas.height/2
						this.ctx.drawImage(img, posX, posY, size, size)
					}
				}



				let darknessAlpha = 0.4

				// draw light
				if(tile.light) {
					this.ctx.fillStyle = `rgba(255, 255, 0, ${(tile.light/100)})`
					darknessAlpha -= tile.light/10
					this.ctx.beginPath()
					this.ctx.rect(posX, posY, size, size)
					this.ctx.fill()
				}

				if(tile.ground == 'empty' && tile.walls.length == 0) darknessAlpha = 0

				if(darknessAlpha > 0) {
					this.ctx.fillStyle = `rgba(0, 0, 0, ${darknessAlpha})`
					this.ctx.beginPath()
					this.ctx.rect(posX-1, posY-1, size+2, size+2)
					this.ctx.fill()
				}

				// draw objects
				if(tile.objectType) {
					let imageName = ''
					let objSize = 1
					if(tile.objectType == 'chest') imageName = 'chest'
					if(tile.objectType == 'torch') {
						imageName = 'torch'
						objSize = 2
					}
					let objectImage = assets.images.objects[imageName]
					let posX = (((tile.x-pp.x)*size)-size/objSize)+this.canvas.width/2
					let posY = (((tile.y-pp.y)*size)-size/objSize)+this.canvas.height/2
					this.ctx.drawImage(objectImage, posX+(size/2/objSize)-0.5, posY+(size/2/objSize)-0.5, (size+1)/objSize, (size+1)/objSize)
				}

				this.ctx.fillStyle = 'rgb(255, 255, 255)'
				if(settings.tilePositions) {
					this.ctx.font = "30px Arial"
					this.ctx.textAlign = "center"
					this.ctx.textBaseline = "middle"
					this.ctx.fillText(`${x}, ${y}`, posX+size/2, posY+size/2)
				}
				if(settings.tileInfoText) {
					this.ctx.font = "10px Arial"
					this.ctx.textAlign = "left"
					let tileInfoText = [tile.ground, tile.objectType, `Walls: ${tile.walls}`, `Light: ${tile.light}`]
					for(let i=0;i<tileInfoText.length;i++) {
						this.ctx.fillText(tileInfoText[i], posX, posY+10+i*10)
					}
				}
				if(settings.gridLines && tile.ground == 'empty') {
					this.ctx.strokeStyle = 'rgb(255, 255, 255)'
					this.ctx.strokeRect(posX, posY, size, size)
				}
			}
		}
	}
}