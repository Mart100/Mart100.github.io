function tick() {
  // create raindrop
  for(let i=0;i<10;i++) {
    if(raindrops.length < settings.amount) {
      let z = Math.random()*5 + 5
      let x = Math.random()*canvas.width*2 -canvas.width/2
      raindrops.push({x: x, y: -500, size: z, speed: z, opacity: z/10})
    }
  }

  // loop trough raindrops
  for(let i=0;i<raindrops.length;i++) {
    let raindrop = raindrops[i]

    // make raindrop fall down
    raindrop.y += raindrop.speed*settings.speed

    // if wind enabled
    if(settings.wind.enabled) {
      if(settings.wind.direction == 'right') raindrop.x += settings.wind.speed*settings.speed
      if(settings.wind.direction == 'left') raindrop.x -= settings.wind.speed*settings.speed
    }

    // if raindrop outside screen
    if(raindrop.y > canvas.height*1.5) raindrops.splice(i, 1)
  }

}
