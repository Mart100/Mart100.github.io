function createRandomPopulation() {
    for (var i=0; i<algorithm.populationSize; i++) {
        algorithm.population.push(new Cube(algorithm.totalMoves))
    }
    
}
function newGeneration() {
    let newPopulation = []
    // calculate fitnesses of cubes
    for(let i=0;i<algorithm.populationSize;i++) algorithm.population[i].calcFitness()
    
    // reset all locations
    for(let i=0;i<algorithm.populationSize;i++) {
        algorithm.population[i].pos = { x: 62.5, y: 62.5 }
        algorithm.population[i].died = false
    }
    let totalFitness = 0
    for(let i=0;i<algorithm.populationSize;i++) {
        totalFitness += algorithm.population[i].fitness
    }
    algorithm.averageFitness += -algorithm.averageFitness/10 + totalFitness/10
    console.log('Generation: '+algorithm.generation+'   TotalFitnness: '+totalFitness+'   Improvement: '+Math.round(totalFitness/algorithm.averageFitness*100-100)+'%   Best cube fitness: '+algorithm.population[0].fitness)

    // sort them by 
    algorithm.population.sort((a,b) => b.fitness-a.fitness)

    // create new population
    for(let i=0;i<algorithm.populationSize;i++) {
        // backup best cubes 10%
        if(i < algorithm.populationSize*0.1) newPopulation.push(algorithm.population[i].clone())

        // mutation of best cubes 80%
        else if(i < algorithm.populationSize*0.9) {
            let clone = algorithm.population[Math.ceil(i % (algorithm.populationSize*0.1))].clone()
            clone.mutate(Math.random()*1)
            newPopulation.push(clone)

        } 
        // totally random 10%
        else newPopulation.push(new Cube(algorithm.totalMoves+algorithm.plusMovesPerGen*algorithm.generation))
    }

    // add ... moves to cube
    console.log(newPopulation)
    for(let i=0;i<algorithm.populationSize;i++) {
        for(let j=0;j<algorithm.plusMovesPerGen;j++) {
            newPopulation[i].moves[algorithm.totalMoves+algorithm.plusMovesPerGen*algorithm.generation+j] = randomDirection()
        }
    }

    console.log(algorithm.population[0])
    algorithm.population = newPopulation
    console.log(algorithm.population[0])


}
function randomDirection() {
    return Math.floor(Math.random()*5)
}