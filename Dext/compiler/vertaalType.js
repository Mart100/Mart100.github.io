function vertaalType(thing) {

  if(thing.includes('bereken')) return bereken(thing)

  if(thing.includes('variabele')) return thing.split(' ')[1]
  else if(!isNaN(thing)) return Number(thing)
  else return `"${thing}"`
}