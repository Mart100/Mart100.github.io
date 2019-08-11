function zet_variabele(line) {
  let variableName = line.split(' ')[2]
  let to = line.split(' ')[4]

  let translatedTo = vertaalType(to)


  return `${variableName} = ${translatedTo}`
}