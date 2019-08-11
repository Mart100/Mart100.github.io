function anders(line) {
  let insideCode = line.split('anders')[1]
  let insideCodeCompiled = compileLine(insideCode)
  return `
else {
  ${insideCodeCompiled}
}`
}