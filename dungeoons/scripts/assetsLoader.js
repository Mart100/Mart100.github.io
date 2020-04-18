let assets = {
  images: {
    ground: {
      mossystone1: 'assets/ground/mossystone1.jpg',
      mossystoneFlowers: 'assets/ground/mossystone2.jpg',
      wall: 'assets/walls/brickwall.png'
    },
    walls: {
      north: 'assets/walls/north.png',
      east: 'assets/walls/east.png',
      south: 'assets/walls/south.png',
      west: 'assets/walls/west.png'
    },
    player: {
      right: 'assets/player/right.png',
      left: 'assets/player/left.png',
      up: 'assets/player/up.png',
      down: 'assets/player/down.png'
    },
    weapons: {
      katana: 'assets/weapons/katana.png'
    },
    objects: {
      chest: 'assets/objects/chest/closed.png',
      torch: {
        0: 'assets/objects/torch/north/0.png',
        1: 'assets/objects/torch/north/1.png'
      }
    },
    items: {
      'speed-potion': 'assets/items/speed-potion.png',
      bandages: 'assets/items/bandages.png',
      grenade: 'assets/items/grenade.png'
    },
    enemies: {
      zombie: {
        right: 'assets/enemies/zombie/right.png',
        left: 'assets/enemies/zombie/left.png',
        up: 'assets/enemies/zombie/up.png',
        down: 'assets/enemies/zombie/down.png'
      },
    }
  },
  sounds: {
    walking: './assets/sounds/walking.mp3',
    swordswing: './assets/sounds/sword-swing.mp3',
    swordhit: './assets/sounds/sword-hit.mp3',
    pickup: './assets/sounds/pickup.mp3',
    damage: './assets/sounds/damage.mp3',
    background: './assets/sounds/background.mp3',
    potion: './assets/sounds/potion.mp3',
    bandage: './assets/sounds/bandage.mp3',
    explosion: './assets/sounds/explosion.mp3',
    grenadeland: './assets/sounds/grenadeland.mp3'
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