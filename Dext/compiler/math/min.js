function min(line) {
  let a = line.split(/min(.+)/)[0].trim()
  let b = line.split(/min(.+)/)[1].trim()

  let Pa = vertaalType(a)
  let Pb = vertaalType(b)

  return `${Pa} - ${Pb}`
}