function keer(line) {
  let a = line.split(/keer(.+)/)[0].trim()
  let b = line.split(/keer(.+)/)[1].trim()

  let Pa = vertaalType(a)
  let Pb = vertaalType(b)

  return `${Pa} * ${Pb}`
}