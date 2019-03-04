let mainSeed = Math.random()

let seeds = {
  'ocean': {
    seed: cap(mainSeed+0.0014930),
    size: 50000,
    plus: 3,
    times: 100,
    split: {
      at: 250,
      plus: 500
    }
  },
  'forest': {
    seed: cap(mainSeed+0.00112930),
    size: 500,
    plus: 2,
    times: 200
  },
  'grassland': {
    seed: cap(mainSeed+0.001028930),
    size: 500,
    plus: 2,
    times: 200
  }
}

