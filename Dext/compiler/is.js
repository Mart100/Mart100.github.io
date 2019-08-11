function is(line) {
  let a = line.split('is')[0].trim()
  let b = line.split('is')[1].trim()

  let Pa = vertaalType(a)
  let Pb = vertaalType(b)

  return `${Pa} == ${Pb}`
} 