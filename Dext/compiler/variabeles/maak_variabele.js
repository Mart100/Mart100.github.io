function maak_variabele(line) {
  let variableName = line.split(' ')[2]
  console.log(variableName)
  return `let ${variableName}`
}