class Connecton {
  constructor(options) {

    if(options.pos) {
      this.pos = { x: options.pos.x, y: options.pos.y }
    }
    if(options.parents) {
      this.parents = options.parents
      this.name = this.crossName(options.parents)
      this.pos = {
        x: options.parents[0].pos.x,
        y: options.parents[0].pos.y
      }
    }

    if(!this.name) this.name = this.randomName()
    this.gender = Math.round(Math.random())
    this.balance = 0
    this.age = 0
    this.sleepAmount = 5000
    this.hungerAmount = 5000
    this.path = []
    this.paths = []
    this.home
    this.married
    this.birth = world.day

    this.go('house')



  }
  tick() {

    this.sleepAmount--
    this.hungerAmount--

    if(this.hungerAmount < 0) this.die()
    if(this.sleepAmount < 0) this.die()

    // current spot
    let currentTile = world.grid.getTile(this.pos.x, this.pos.y)
    let roomType
    if(currentTile && currentTile.roomType) {
      roomType = currentTile.roomType
      if(roomType == 'restaurant') {
        if(this.balance > 0 && this.hungerAmount < 10000) {
          this.balance -= 5
          this.hungerAmount += 50
        }
      }
      if(roomType == 'house') {
        if(this.sleepAmount < 10000) {
          this.sleepAmount += 5
        }
      }
      if(roomType == 'work') {
        this.balance += 1
      }
    }

    // increase age
    this.age = world.day-this.birth

    // If path follow path
    if(this.path.length > 0) {
      let seg = this.path[0]
      let movement = {
        x: seg.x-this.pos.x,
        y: seg.y-this.pos.y
      }
      this.move(movement)
      this.path.shift()
      return
    }

    let time = world.time
    let hunger = this.hungerAmount
    let sleep = this.sleepAmount


    // Tasks
    if(time>6 && time<10 && sleep>5000 && roomType!='work') this.go('work')
    if(time>16 && time<18 && roomType!='restaurant') this.go('restaurant')
    if(time>19 && time<20 && hunger>5000 && roomType!='home') this.go('home')
    if(time<6 && roomType!='home') this.go('home')
    
  }
  die() {
    let idx = world.connectons.indexOf(this)
    if(idx == -1) return
    world.connectons.splice(idx, 1)
    delete this

  }
  move(movement) {
    this.pos.x += movement.x
    this.pos.y += movement.y
    if(selectedConnecton == this) {
      world.grid.move({x: -movement.x, y: -movement.y})
    }
  }
  async go(room) {

    console.log('GO: ', room)
    if(this.path.length != 0) return
    if(this.findRecursion && this.findRecursion.searching) return
    if(room == 'home') {
      if(this.home) room = this.home
      else room = 'house'
    }

    if(room.constructor == undefined || room.constructor.name != 'Room') {
      if(typeof room == 'string') room = new Room(undefined, room)
    }

    let startPosition = {x: this.pos.x, y: this.pos.y}

    let possiblePath = this.paths.find(p => p.from.x == startPosition.x && p.from.y == startPosition.y && p.to.id == room.id)
    if(possiblePath) {
      this.path = JSON.parse(JSON.stringify(possiblePath.path))
      return 'SUCCESS'
    }

    this.findRecursion = {}
    this.findRecursion.searching = true
    this.findRecursion.exploredCells = []
    this.findRecursion.exploredCellsVal = {}
    this.findRecursion.foundEnd = false
    let path = await this.checkCellRecursion(0, this.pos, room)
    if(settings.drawConnectonSearch && this.findRecursion.exploredCells) {
      for(let pos of this.findRecursion.exploredCells) {
        world.grid.setTileProperty(pos.split('=')[0], pos.split('=')[1], 'searchAlgoTrace', 1)
      }
    }
    this.findRecursion.searching = false
    //console.log('Going to house: ', path)
    if(path == 'OUT_OF_RANGE' || path == false) {
      console.log(`Failed Path: ${room}. ${response}`)
      return path
    }
    else {
      this.path = path.reverse()

      if(room.positions && room) {
        let pathDetails = {
          from: {
            x: startPosition.x,
            y: startPosition.y
          },
          to: room,
          path: JSON.parse(JSON.stringify(this.path))
        }
        if(this.paths.find(p => p.from.x == startPosition.x && p.from.y == startPosition.y && p.to.id == room.id) == undefined) {
          if(pathDetails.path.length > 0) {
            this.paths.push(pathDetails)
          }
        }
      }

      return 'SUCCESS'
    }

  }
  checkCellRecursion(iter, cellPos, room) {
    return new Promise(async (resolve, reject) => {
      if(this.findRecursion.foundEnd) return resolve(false)
      let cell = world.grid.data[cellPos.x][cellPos.y]
  
      this.findRecursion.exploredCells.push(`${cellPos.x}=${cellPos.y}`)

      if(settings.drawConnectonSearch) {
        world.grid.setTileProperty(cell.x, cell.y, 'searchAlgoTrace', 255-iter*2)
      }
      this.findRecursion.exploredCellsVal[`${cellPos.x}=${cellPos.y}`] = iter
      
      // if wanted destination. Retrace
      if(cell.roomType == room.type) {
        if(room.positions) {
          if(room.positions.find(p => p.x == cell.x && p.y == cell.y)) {
            this.findRecursion.foundEnd = true
            return resolve([{x: cell.x, y: cell.y}])
          }
        } else {
          let room = world.findRoomByTile(cellPos)
          if(room.isConnectonAllowed(this)) {
            room.addConnecton(this)
            if(room.type == 'house') this.home = room
            this.findRecursion.foundEnd = true
            return resolve([{x: cell.x, y: cell.y}])
          }
        }
      }
      let neighbors = world.grid.checkTileNeighbors4(cellPos)
      neighbors.sort((a, b) => Math.random()-Math.random())
      
      await sleep(1)
      for(let i=0;i<neighbors.length;i++) {
        let n = neighbors[i]
        if(!n.types) {
          world.grid.createTile(n.x, n.y)
          n = world.grid.getTile(n.x, n.y)
        }
        let nType = n.types[n.types.length-1]
        if(nType != 'hall' && n.roomType != room.type) continue
        let nPos = {x: n.x, y: n.y}
        if(this.findRecursion.exploredCells.includes(`${nPos.x}=${nPos.y}`)) continue
        this.checkCellRecursion(iter+1, nPos, room).then((response) => {
          if(response && response != 'OUT_OF_RANGE') {
            let leastIterVal = 1e9
            let leastIterPos = nPos
            for(let j=0;j<neighbors.length;j++) {
              let n1 = neighbors[i]
              let iterValN = this.findRecursion.exploredCellsVal[`${n1.x}=${n1.y}`]
              if(iterValN < leastIterVal) {
                leastIterVal = iterValN
                leastIterPos = {x: n1.x, y: n1.y}
              }
            }
            response.push(leastIterPos)
            return resolve(response)
          }
        })
      }
    })
  }
  crossName(parents) {
    let s = ''
    s += parents[0].split('-')[0]
    s += '-'
    s += parents[1].split('-')[1]
    
    let num = 0
    let sf = s + num
    while(world.connectons.find(c => c.name == sf) != undefined) {
      num++
      sf = s + num
    }

    return s + num
  }
  randomName() {
    let a = 'abcdefghijklmnopqrstuvwxyz'
    let n = '0123456789'
    let s = ''
    for(let i=0;i<10;i++) {
      if(i <= 5) s += a[Math.floor(Math.random()*a.length)]
      if(i == 5) s += '-'
      if(i > 5) s += n[Math.floor(Math.random()*n.length)]
    }

    return s
  }
}