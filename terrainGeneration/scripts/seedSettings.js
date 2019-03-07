let mainSeed = Math.random()

let seeds = {
  'ocean': {
    seed: cap(mainSeed+0.0001),
    size: 50000,
    plus: 1,
    times: 450,
    split: {
      at: 300,
      plus: 500,
    },
    biome: true,
    color: [10, 10, 200]
  },
  'forest': {
    seed: cap(mainSeed+0.002),
    size: 500,
    plus: 2,
    times: 200,
    biome: true,
    color: [10, 50, 10]
  },
  'grassland': {
    seed: cap(mainSeed+0.003),
    size: 500,
    plus: 2,
    times: 200,
    biome: true,
    color: [10, 120, 10]
  },
  'desert': {
    seed: cap(mainSeed+0.004),
    size: 5000,
    plus: 1,
    times: 220,
    biome: true,
    split: {
      at: 300,
      times: 1.7
    },
    color: [194, 178, 128]
  },
  'tree': {
    seed: cap(mainSeed+0.005),
    size: 5,
    plus: 1,
    times: 200,
    switch: 300,
  },
  'cactus': {
    seed: cap(mainSeed+0.005),
    size: 1,
    plus: 1,
    times: 160,
    switch: 300,
  }
}

