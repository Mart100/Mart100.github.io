function bereken(line) {

  let berekening = line.replace('bereken', '').trim()

  let resultaat

  let things = [['plus', 999], ['min', 999], ['keer', 999], ['gedeeld door', 999]]

  if(line.includes('plus')) things[0][1] = line.indexOf('plus')
  if(line.includes('min')) things[1][1] = line.indexOf('min')
  if(line.includes('keer')) things[2][1] = line.indexOf('keer')
  if(line.includes('gedeeld door')) things[3][1] = line.indexOf('gedeeld door')

  things.sort((a, b) => { return a[1]-b[1]})

  console.log('\n--------------------')
  console.log(things)
  console.log(line)
  console.log('\n')
  
  if(things[0][0] == 'plus') resultaat = plus(berekening)
  if(things[0][0] == 'min') resultaat = min(berekening)
  if(things[0][0] == 'keer') resultaat = keer(berekening)
  if(things[0][0] == 'gedeeld door') resultaat = gedeeld_door(berekening)

  return resultaat
}