function tick() {
    if(phase == 'evolution') {
        let noneMoving = true
        // move cubes
        for(let i=0;i<algorithm.populationSize;i++) {
            let cube = algorithm.population[i]

            if(cube.died) continue
            nextMove = cube.moves[algorithm.currentMove]

            //console.log(nextMove)

            //if(Math.random() > 0.99) console.log('CurrentMove: '+algorithm.currentMove+'   nextMove: '+nextMove)
            if(nextMove != undefined) noneMoving = false
            if(nextMove == 1) if(pixels.includes((cube.pos.x-1)+'|'+(cube.pos.y))) cube.died = true; else cube.pos.x -= 10
            if(nextMove == 2) if(pixels.includes((cube.pos.x)+'|'+(cube.pos.y-1))) cube.died = true; else cube.pos.y -= 10
            if(nextMove == 3) if(pixels.includes((cube.pos.x+1)+'|'+(cube.pos.y))) cube.died = true; else cube.pos.x += 10
            if(nextMove == 4) if(pixels.includes((cube.pos.x)+'|'+(cube.pos.y+1))) cube.died = true; else cube.pos.y += 10;
        }
        if(noneMoving) {
            newGeneration()
            algorithm.generation++
            algorithm.currentMove = 0

        }
        algorithm.currentMove++
    }
}
