let terrainHeightStrength = 500
let terrainSize = 1500
let terrainTileSize = 80
let terrainColor = 'height' // 'random'

function createChunk(z=0) {
  noise.seed = Math.random()
  let faces = []
  
  for(let i=z-5000;i<z+10000;i+=terrainTileSize) {
    for(let j=-2000;j<2000;j+=terrainTileSize) {
      let m = terrainHeightStrength
      let ts = terrainSize
      let tts = terrainTileSize+1
      let point1 = new Vector(j, noise.simplex2(j/ts, i/ts)*m, i)
      let point2 = new Vector(j, noise.simplex2(j/ts, (i-tts)/ts)*m, i-tts)
      let point3 = new Vector(j-tts, noise.simplex2((j-tts)/ts, i/ts)*m, i)
      let point4 = new Vector(j-tts, noise.simplex2((j-tts)/ts, (i-tts)/ts)*m, i-tts)

      let middleNoise = noise.simplex2((j-tts/2)/ts, (i-tts/2)/ts)

      let color
      if(terrainColor == 'height') color = `rgb(${255 - (middleNoise+1)/2*255}, 0, ${(middleNoise+1)/2*255})`
      if(terrainColor == 'random') color = randomRGB()
      faces.push({corners: [point1, point3, point4, point2], color: color})
    }
  }

  new Object3D(faces, {fill: true, color: 'rgba(0, 0, 0, 1)'})
}