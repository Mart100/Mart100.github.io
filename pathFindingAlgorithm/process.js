function tick() {
    for (var i = 0, len = 1; i < len; i++) {
        if(phase == 'evolution') {
            let noneMoving = true
            // move cubes
            for(let i=0;i<algorithm.populationSize;i++) {
                let cube = algorithm.population[i]

                if(cube.died) continue
                nextMove = cube.moves[algorithm.currentMove]
                if(nextMove == 0) continue

                if(nextMove != undefined) noneMoving = false
                if(settings.algorithm.skipCollision && cube.pos.x > 20 && cube.pos.x < canvas.width-20 && cube.pos.y > 20 && cube.pos.y < canvas.height-20) {
                    if(nextMove == 1) cube.pos.x -= 10
                    if(nextMove == 2) cube.pos.y -= 10
                    if(nextMove == 3) cube.pos.x += 10
                    if(nextMove == 4) cube.pos.y += 10
                } else if(!settings.algorithm.skipCollision) {
                    if(nextMove == 1) if(pixels.includes(Math.floor(cube.pos.x/10-1)+'|'+Math.floor(cube.pos.y/10))) cube.died = true; else cube.pos.x -= 10
                    if(nextMove == 2) if(pixels.includes(Math.floor(cube.pos.x/10)+'|'+Math.floor(cube.pos.y/10-1))) cube.died = true; else cube.pos.y -= 10
                    if(nextMove == 3) if(pixels.includes(Math.floor(cube.pos.x/10+1)+'|'+Math.floor(cube.pos.y/10))) cube.died = true; else cube.pos.x += 10
                    if(nextMove == 4) if(pixels.includes(Math.floor(cube.pos.x/10)+'|'+Math.floor(cube.pos.y/10+1))) cube.died = true; else cube.pos.y += 10
                } else this.died = true

                if(cube.pos.x > algorithm.finishPos.x && cube.pos.y > algorithm.finishPos.y) cube.finished()
            }
            if(noneMoving) {
                newGeneration()
                algorithm.generation++
                algorithm.currentMove = 0

            }
            algorithm.currentMove++
        }
    }
}
