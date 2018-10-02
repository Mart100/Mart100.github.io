const PrimeNumbers = [2]
let i = 1e11
$(Calculate())

async function Calculate() {
  i++
  if(await isPrimeNumber(i)) {
    PrimeNumbers.push(i)
    updateHtml()
  }
  Calculate()
}
function isPrimeNumber(i) {
  return new Promise(resolve => {
    for(p of PrimeNumbers) {
      if(i % p == 0) {

        resolve(false)
      }
      if(i/p > p) setTimeout(() => { resolve(true) }, 0.1)
    }
    setTimeout(() => { resolve(true) }, 0.1)
  })
}

function updateHtml() {
  $('#PN1').html(PrimeNumbers[PrimeNumbers.length-1])
  $('#PN2').html(PrimeNumbers[PrimeNumbers.length-2])
  $('#PN3').html(PrimeNumbers[PrimeNumbers.length-3])
  $('#PN4').html(PrimeNumbers[PrimeNumbers.length-4])
  $('#PN5').html(PrimeNumbers[PrimeNumbers.length-5])
  $('#PN6').html(PrimeNumbers[PrimeNumbers.length-6])
  $('#PN7').html(PrimeNumbers[PrimeNumbers.length-7])
  $('#PN8').html(PrimeNumbers[PrimeNumbers.length-8])
  $('#PN9').html(PrimeNumbers[PrimeNumbers.length-9])
}
