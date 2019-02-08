function tick() {
  // if paused. Stop
  if(isPaused) return

  // add Time
  seconds += speed

  // Temperature formula
  houseTemp -= factor * (houseTemp - outsideTemp) * speed/60

}
