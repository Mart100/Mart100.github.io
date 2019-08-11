function als(line) {
  let boolean = line.split('dan')[0].replace('als', '')
  let outputBoolean = is(boolean)
  let insideCode = line.split('dan')[1]
  let insideCodeCompiled = compileLine(insideCode)
  return `
if(${outputBoolean}) {
  ${insideCodeCompiled}
}`
} 