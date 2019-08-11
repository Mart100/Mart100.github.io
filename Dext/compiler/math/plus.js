function plus(line) {
  let a = line.split(/plus(.+)/)[0].trim()
  let b = line.split(/plus(.+)/)[1].trim()

  let Pa = vertaalType(a)
  let Pb = vertaalType(b)

  return `${Pa} + ${Pb}`
}