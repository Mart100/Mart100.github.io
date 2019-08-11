function print(line) {
  let raw = line.replace('print', '').trim()
  let text = vertaalType(raw)
  return `console.log(${text})`
}