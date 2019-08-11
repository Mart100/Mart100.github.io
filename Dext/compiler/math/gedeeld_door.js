function gedeeld_door(line) {
  let a = line.split(/gedeeld door(.+)/)[0].trim()
  let b = line.split(/gedeeld door(.+)/)[1].trim()

  let Pa = vertaalType(a)
  let Pb = vertaalType(b)

  return `${Pa} / ${Pb}`
}