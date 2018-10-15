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

    console.log('Generation: '+algorithm.generation+'   TotalFitnness: '+totalFitness+'   Improvement: '+Math.round(totalFitness/algorithm.averageFitness*100-100)+'%   Best cube fitness: '+algorithm.population[0].fitness)

    // create new population
    for(let i=0;i<algorithm.populationSize;i++) {
        // backup best cubes 10%
        if(i < algorithm.populationSize*0.1) newPopulation[i] = algorithm.population[i].clone()

        // mutation of best cubes 80%
        else if(i < algorithm.populationSize*0.9) {
            let clone = algorithm.population[Math.ceil(i % (algorithm.populationSize*0.1))].clone()
            newPopulation[i] = new Cube( await clone.mutate(mutateStrengthFunction()))

        } 
        // totally random 10%
        else newPopulation[i] = new Cube(algorithm.population[0].moves.length)
    }

    // add ... moves to cube
    for(let i=0;i<algorithm.populationSize;i++) {
        for(let j=0;j<algorithm.plusMovesPerGen;j++) {
            newPopulation[i].moves[algorithm.totalMoves+algorithm.plusMovesPerGen*algorithm.generation+j] = 0
        }
    }

    algorithm.population = newPopulation.slice()
}
function randomDirection() {
    return Math.floor(Math.random()*5)
}
function mutateStrengthFunction() {
    let random = Math.random()
    return Math.random()*0.05
}