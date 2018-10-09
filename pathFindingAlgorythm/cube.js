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
            let random = Math.floor(Math.random()*5)
            this.moves[i] = random 
        }
    }
    calcFitness() {
        if(this.pos.x < 1 || this.pos.y < 1) this.fitness = 0
        else this.fitness = distanceGrid[Math.floor(this.pos.x/10)][Math.floor(this.pos.y/10)]
    }
    mutate() {
        // loop trough moves
        for(let num in this.moves) {
            if(Math.random() > 0.5) this.moves[num] = Math.floor(Math.random()*5)

        }
    }
}

// 0: dont move
// 1: left
// 2: up
// 3: right
// 4: down