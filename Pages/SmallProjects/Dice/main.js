$(function() {
  let currentRotation = {'Y': 0, 'X': 0, 'Z': 0}
  $(document).on('click', function() {
    let DiceNumber = Math.round(Math.random() * 5) + 1
    switch(DiceNumber) {
      case(1):
        playDice({'Y': 0, 'X': 0, 'Z': 0})
        break
      case(2):
        playDice({'Y': 0, 'X': -90, 'Z': 0})
        break
      case(3):
        playDice({'Y': 90, 'X': 0, 'Z': 0})
        break
      case(4):
        playDice({'Y': -90, 'X': 0, 'Z': 0})
        break
      case(5):
        playDice({'Y': 0, 'X': 90, 'Z': 0})
        break
      case(6):
        playDice({'Y': 180, 'X': 0, 'Z': 0})
        break
    }
  })
  async function playDice(to) {
    let RollTime = Math.round(Math.random() * (200 - 50) + 50)
    // FastSpin Dice
    let i = 0
    let FastSpin = setInterval(function() {
      i++
      currentRotation.Y += Math.random() * 2
      currentRotation.X += Math.random() * 4
      currentRotation.Z += Math.random() * 8
      $('#cube').css('transform', `rotateY(${currentRotation.Y}deg) rotateX(${currentRotation.X}deg) rotateZ(${currentRotation.Z}deg)`)
      if(i > RollTime) {
        clearInterval(FastSpin)
        console.log(to)

        // Correcting
        let ii = 0
        let CorrectSpin = setInterval(function() {
          if(ii > 98) clearInterval(CorrectSpin)
          ii++
          //$('#cube').css('transform', `rotateY(${to.Y}deg) rotateX(${to.X}deg) rotateZ(${to.Z}deg)`)
          $('#cube').css('transform', `rotateY(${ii * (to.Y - currentRotation.Y) / 100 + currentRotation.Y}deg) rotateX(${ii * (to.X - currentRotation.X) / 100 + currentRotation.X}deg) rotateZ(${ii * (to.Z - currentRotation.Z) / 100 + currentRotation.Z}deg)`)
          console.log(ii+' * '+'('+to.Y+' - '+currentRotation.Y+')'+' / 100 + '+currentRotation.Y+' = '+(ii * (to.Y - currentRotation.Y) / 100 + currentRotation.Y))
        }, 1)
      }
    }, 1)
  }
})
