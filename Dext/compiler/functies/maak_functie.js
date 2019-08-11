function maak_functie(line) {
  let functionName = line.split(' ')[2]
  return `function ${functionName}() {`
}