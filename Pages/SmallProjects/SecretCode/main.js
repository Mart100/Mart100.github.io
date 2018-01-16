$(function() {
  let i = 0
  const calc = setInterval(function() {
    i++
    if(i % 2 == 0 || i % 3 == 0) i++
    if(Priemgetal(i)) $('.text').prepend(i + '<br />')
  }, 1)
  function Priemgetal(i) {
    for(p = 1; p < (i / 2); p += 2) if(i % p == 0 && p != 1) return false
    return true
  }
})
