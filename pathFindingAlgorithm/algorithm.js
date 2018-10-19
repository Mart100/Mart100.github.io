function createRandomPopulation() {
    for (var i=0; i<algorithm.populationSize; i++) {
        algorithm.population.push(new Cube(algorithm.totalMoves))
    }
    
}
async function newGeneration() {
    let newPopulation = []
    // calculate fitnesses of cubes
    for(let i=0;i<algorithm.populationSize;i++) algorithm.population[i].calcFitness()
    
    // calculate total fitness
    let totalFitness = 0
    for(let i=0;i<algorithm.populationSize;i++) {
        totalFitness += algorithm.population[i].fitness
    }
    algorithm.averageFitness += -algorithm.averageFitness/10 + totalFitness/10

    // sort them by fitness
    algorithm.population.sort((a,b) => b.fitness-a.fitness)

    algorithm.history.push({
        totalFit: Math.round(totalFitness), 
        improve: Math.round(totalFitness/algorithm.averageFitness*100-100), 
        bestFit: Math.round(algorithm.population[0].fitness*10)/10, 
        bestMoves: algorithm.population[0].moves.length
    })

    if($('#infoWindowGenerations')[0] != undefined) logGenerationHistory()

    // create new population
    for(let i=0;i<algorithm.populationSize;i++) {
        // backup best cubes
        if(i < algorithm.populationSize*algorithm.rates.best) newPopulation[i] = algorithm.population[i].clone()

        // mutation of best cubes
        else if(i < algorithm.populationSize*algorithm.rates.mutation + algorithm.populationSize*algorithm.rates.best) {
            let clone = algorithm.population[Math.ceil(i % (algorithm.populationSize*0.1))].clone()
            newPopulation[i] = new Cube( await clone.mutate(mutateStrengthFunction()))

        }

        // crossover of random best cubes
        else if(i < algorithm.populationSize*algorithm.rates.crossover + algorithm.populationSize*algorithm.rates.best + algorithm.populationSize*algorithm.rates.mutation) {
            let randomA = algorithm.population[Math.round(Math.random()*algorithm.populationSize*0.1)]
            let randomB = algorithm.population[Math.round(Math.random()*algorithm.populationSize*0.1)]
            newPopulation[i] = new Cube(crossover(randomA.moves, randomB.moves))


        }
        // totally random 10%
        else newPopulation[i] = new Cube(algorithm.population[0].moves.length)
    }

    // add ... moves to cube
    for(let i=0;i<algorithm.populationSize;i++) {
        for(let j=0;j<algorithm.plusMovesPerGen;j++) {
            newPopulation[i].moves[newPopulation[i].moves.length] = 0
        }
    }

    algorithm.population = newPopulation.slice()
}
function crossover(cubeA, cubeB) {
    let randomSplit = Math.round(Math.random()*(cubeA.length+cubeB.length)/2)
    let sliceA = cubeA.slice(0, randomSplit)
    let sliceB = cubeB.slice(randomSplit, cubeB.length)
    //console.log(randomSplit, sliceA, sliceB, cubeA, cubeB)
    return sliceA.concat(sliceB)
}
function logGenerationHistory() {
    $('#infoWindowGenerations').prepend(algorithm.generation+': '+JSON.stringify(algorithm.history[algorithm.history.length-1]).replace(/"|{|}|"/g, '').replace(/:/g, ': ').replace(/,/g, ';   ')+'<br>')
}
function randomDirection() {
    return Math.floor(Math.random()*5)
}
function mutateStrengthFunction() {
    let random = Math.random()
    if(random > 0.9) return Math.random()*0.5
    else if(random > 0.7) return Math.random()*0.1
    else if(random > 0.3) return Math.random()*0.05
    else return Math.random()*0.02
}