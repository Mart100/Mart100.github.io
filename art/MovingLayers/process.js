function tick() {

  // calculate trend
  let random = Math.random()
  if(random > ((100-trend)/100)) trend *= -1


  if(random > 0.8) trend += Math.random()*10

  if(random > 0.3) {
    let random2 = Math.random()
    if(random2 > 0.5) trend += (100-trend)/100
    else trend -= (100-trend)/100
  }

  if(trend > 100) trend = 100

  // loop trough layers
  for(let i=0; i<settings.layers; i++) {
    let points = layers[i]

    let pointsCopy = JSON.parse(JSON.stringify(points))
    
    points[0] = 500 + trend

    for(let j=0; j<settings.totalPoints; j++) {
      if(j == 0) continue
      points[j] = pointsCopy[j-1]
    }
  }
}
