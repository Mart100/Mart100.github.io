function createRandomPopulation() {
    for (var i=0; i<algorithm.populationSize; i++) {
        algorithm.population.push(new Cube(2000))
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
    console.log(algorithm.population)
    algorithm.averageFitness += -algorithm.averageFitness/10 + totalFitness/10
    console.log('Generation: '+algorithm.generation+'   TotalFitnness: '+totalFitness+'   Improvement: '+Math.round(totalFitness/algorithm.averageFitness*100-100)+'%   Best cube fitness: '+algorithm.population[0].fitness)

    // sort them by 
    algorithm.population.sort((a,b) => b.fitness-a.fitness)

    // create new population
    for(let i=0;i<algorithm.populationSize;i++) {
        // backup best cubes 10%
        if(i < algorithm.populationSize*0.1) newPopulation.push(new Cube(algorithm.population[i].moves))

        // mutation of best cubes 70%
        else if(i < algorithm.populationSize*0.8) {
            let wich = Math.ceil(i % algorithm.populationSize*0.1)
            let clone = new Cube()
            algorithm.population[wich].mutate()
            clone.moves = algorithm.population[wich].moves
            newPopulation.push(clone)

        } 
        // totally random 20%
        else newPopulation.push(new Cube(100))
    }

    
    algorithm.population = newPopulation


}