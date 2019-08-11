function compileLine(line) {

  let output = ''

  line = line.trim()

  if(line.startsWith('maak variabele')) output += maak_variabele(line)
  if(line.startsWith('zet variabele')) output += zet_variabele(line)
  if(line.startsWith('als')) output += als(line)
  if(line.startsWith('anders')) output += anders(line)
  if(line.startsWith('print')) output += print(line)
  if(line.startsWith('maak functie')) output += maak_functie(line)
  if(line.startsWith('eindig functie')) output += eindig_functie(line)
  if(line.startsWith('begin functie')) output += begin_functie(line)
  if(line.startsWith('lus dit')) output += lus(line)
  if(line.startsWith('stop lus')) output += stop_lus(line)
  if(line.startsWith('bereken')) output += bereken(line)
  if(line.startsWith('//')) return ''

  return output + '\n'
}