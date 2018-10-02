$(function() {
  const Screen = {'width': window.screen.width, 'height': window.screen.height}
  let numberOfP = 400
  let Pstorage = {}


  // Create all particles
  for(let i = 0; i < numberOfP; i++) {
    size = Math.random() * (20 - 5) + 5
    $('body').append(`<div class="particle" id="particle-${i}" style="width: ${size}; height: ${size}"></div>`)
    Pstorage[i] = {
      'side': Math.random() * 10 -5,
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
      $('#particle-'+i).css('top', moveDown(i, 2)) // move down
      $('#particle-'+i).css('left', moveToSides(i, 30)) // Move to sides
      $('#particle-'+i).css('opacity', Opacity(i))
      if($('#particle-'+i).css('opacity') == 0) { // If particle dissapeared. Start over
        $('#particle-'+i).css({'opacity': '1', 'left': '50%', 'top': '230px'})
        Pstorage[i] = {
          'side': Math.random() * 10 -5,
          'speed': Math.random() + 0.5,
          'lifetime': Math.random() + 0.1,
          'left': '50%',
          'opacity': '1',
          'top': 230
        }
      }

    }
  }, 1)
  function moveToSides(i, stepsize) {
    //currentX = parseFloat($('#particle-'+i).css('left')) / Screen.width * 100
    currentX = parseFloat(Pstorage[i].left)
    currentX += (Pstorage[i].side / stepsize) * Math.random()
    Pstorage[i].left = currentX
    return currentX + '%'
  }
  function Opacity(i) {
    Pstorage[i].opacity -= Pstorage[i].lifetime / 10
    return Pstorage[i].opacity - Pstorage[i].lifetime / 10
  }
  function moveDown(i, stepsize) {
    Pstorage[i].top += Pstorage[i].speed * stepsize
    return Pstorage[i].top + Pstorage[i].speed * stepsize
  }
})
