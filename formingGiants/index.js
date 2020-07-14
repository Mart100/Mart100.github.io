let world


$(() => {

  world = new World()

  world.geneAmount = 10
  world.createGenes(world.geneAmount)

  world.population = 1000
  world.createPuppets(world.population)

  world.startProcess()
  world.startRenderer()

})
