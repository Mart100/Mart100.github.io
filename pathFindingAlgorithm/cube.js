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
        if(this.died) this.fitness = 0
        else this.fitness = distanceGrid[Math.floor(this.pos.x/10)][Math.floor(this.pos.y/10)]-this.moves.length/10
    }
    mutate(strength) {
        return new Promise((resolve, reject) => {
            let newMoves = []
            // loop trough moves
            for(let num in this.moves) {
                if(Math.random() < strength) newMoves[num] = randomDirection()
                else newMoves[num] = this.moves[num]
            }
            resolve(newMoves)
        })
    }
    clone() {
        return new Cube(this.moves)
    }
    finished() {
        this.moves = this.moves.slice(0, algorithm.currentMove)
    }
}

// 0: dont move
// 1: left
// 2: up
// 3: right
// 4: down