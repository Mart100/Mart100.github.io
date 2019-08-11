function lus(line) {
  let times = vertaalType(line.split(' ')[2])

  return `for(let k=0; k<${times}; k++) {`
}