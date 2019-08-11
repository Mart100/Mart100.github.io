function begin_functie(line) {
  let functionName = line.split(' ')[2]
  return `${functionName}()`
}