let assets = {
	images: {
		entities: {
			player: {
				north: ['assets/player/north/0.png', 'assets/player/north/1.png'],
				south: ['assets/player/south/0.png', 'assets/player/south/1.png'],
				east: ['assets/player/east/0.png', 'assets/player/east/1.png'],
				west: ['assets/player/west/0.png', 'assets/player/west/1.png'],
			}
		},
		items: {
			watering_can: 'assets/items/watering_can.png',
			watering_can_flipped: 'assets/items/watering_can_flipped.png'
		}
	},
	sounds: {
	}
}

loopAssetsChildren(assets, [], {})

function loopAssetsChildren(obj, keys) {
	for(let obj1key in obj) {
		let obj1 = obj[obj1key]
		let newKeys = [...keys, obj1key]
		if(typeof obj1 == 'object') {
			loopAssetsChildren(obj1, newKeys)
		}
		else if(typeof obj1 == 'string') {
			let res = ''
			if(obj1.endsWith('.png') || obj1.endsWith('.jpg')) {
				let img = new Image()
				img.src = obj1
				res = img
			}
			if(obj1.endsWith('.webm') || obj1.endsWith('.wav') || obj1.endsWith('.mp3')) {
				let howl = new Howl({ src: obj1 })
				res = howl
			}
			let evaltxt = ''
			for(let i=0;i<newKeys.length;i++) evaltxt += `['${newKeys[i]}']`
			eval(`assets${evaltxt} = res`)
		}
	}
}