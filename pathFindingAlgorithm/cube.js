class Cube {
    constructor(moves) {
        this.moves = []
        if(typeof moves == 'number') this.randomize(moves)
        else if(typeof moves == 'object') this.moves = moves
        this.died = false
        this.pos = { x: 62.5, y: 62.5 }
        this.fitness = 0

    }
    randomize(size) {
        for (var i=0;i<size;i++) {
            let random = randomDirection()
            this.moves[i] = random
        }
    }
    calcFitness() {
        if(this.died) this.fitness = distanceGrid[Math.floor(this.pos.x/10)][Math.floor(this.pos.y/10)]*0.8
        else this.fitness = distanceGrid[Math.floor(this.pos.x/10)][Math.floor(this.pos.y/10)]
    }
    mutate(strength) {
        // loop trough moves
        for(let num in this.moves) {
            if(Math.random() < strength) this.moves[num] = randomDirection()
        }
    }
    clone() {
        return new Cube(this.moves)
    }
}

// 0: dont move
// 1: left
// 2: up
// 3: right
// 4: down