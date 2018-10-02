function random(min, max, neg) {
  let ne
  // if min is negative
  if(min < 0) return Math.random() * (-min + max) + min
  else return Math.abs(Math.random() * (min - max) + min)
}