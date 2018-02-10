$(function() {
  const Screen = {'width': window.screen.width, 'height': window.screen.height}
  let numberOfP = 800
  let Pstorage = {}


  // Create all particles
  for(let i = 0; i < numberOfP; i++) {
    $('body').append(`<div class="particle" id="particle-${i}"></div>`)
    Pstorage[i] = {
      'side': Math.random() * 5 -2.5,
      'speed': Math.random() + 0.5,
      'lifetime': Math.random() + 0.1,
      'left': 50,
      'opacity': 1,
      'top': 230
    }
    $('#particle-'+i).css('background-color', `rgb(${Math.round(Math.random() * 250)}, 50, 50)`)
  }
  let Update = setInterval(function() {
    for(let i = 0; i < numberOfP; i++) {
      $('#particle-'+i).css('top', moveDown(i)) // move down
      $('#particle-'+i).css('left', moveToSides(i)) // Move to sides
      $('#particle-'+i).css('opacity', Opacity(i))
      if($('#particle-'+i).css('opacity') == 0) { // If particle dissapeared. Start over
        $('#particle-'+i).css({'opacity': '1', 'left': '50%', 'top': '230px'})
        Pstorage[i] = {
          'side': Math.random() * 5 -2.5,
          'speed': Math.random() + 0.5,
          'lifetime': Math.random() + 0.1,
          'left': '50%',
          'opacity': '1',
          'top': 230
        }
      }

    }
  }, 1)
  function moveToSides(i) {
    //currentX = parseFloat($('#particle-'+i).css('left')) / Screen.width * 100
    currentX = parseFloat(Pstorage[i].left)
    currentX += (Pstorage[i].side / 10) * Math.random()
    Pstorage[i].left = currentX
    return currentX + '%'
  }
  function Opacity(i) {
    Pstorage[i].opacity -= Pstorage[i].lifetime / 10
    return Pstorage[i].opacity - Pstorage[i].lifetime / 10
  }
  function moveDown(i) {
    let random = Math.random()
    Pstorage[i].top += Pstorage[i].speed * 5 * random
    return Pstorage[i].top + Pstorage[i].speed * 5 * random
  }
})
