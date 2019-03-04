let mainSeed = Math.random()

let seeds = {
  'ocean': {
    seed: cap(mainSeed+0.0001),
    size: 50000,
    plus: 3,
    times: 100,
    split: {
      at: 250,
      plus: 500
    },
    biome: true
  },
  'forest': {
    seed: cap(mainSeed+0.0002),
    size: 500,
    plus: 2,
    times: 200,
    biome: true
  },
  'grassland': {
    seed: cap(mainSeed+0.0003),
    size: 500,
    plus: 2,
    times: 200,
    biome: true
  },
  'desert': {
    seed: cap(mainSeed+0.0004),
    size: 2000,
    plus: 1,
    times: 300,
    biome: true,
    split: {
      at: 260,
      plus: 100
    }
  }
}

