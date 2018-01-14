for(i = 1; i < 1e99; i++) {
  if(i % 2 == 0 || i % 3 == 0) continue
  if(Priemgetal(i)) $('.text').append(i + '<br />')
}
function Priemgetal(i) {
  for(p = 1; p < (i / 2); p += 2) if(i % p == 0 && p != 1) return false
  return true
}
