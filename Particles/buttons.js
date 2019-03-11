const buttons = {
  rain: {
    color: 'rgb(15, 56, 168)',
    text: 'Rain',
    clicked() {

      implodeButtons()
      isPaused = false
      // set particle Settings
      Psettings.gravity = new Vec2(0, 0.1)
      
      // create particles
      let settings = {
        shape: new Vec2(10, 10),
        color: [15, 56, 168, 0.5]
      }
      for(let buttonName in buttons) {
        let button = buttons[buttonName]

        for(let i=0;i<200;i++) {
          // change settings
          settings.position = new Vec2(getRandomRange(button.x, button.x+button.width), getRandomRange(button.y, button.y+button.height))
          settings.velocity = new Vec2(getRandomRange(-5, 5), getRandomRange(-8, 0))

          particles.push(new Particle(settings))
        }
      }
    setTimeout(() => { window.location.href = "particles/rain/index.html" }, 3000)
    }
  },
  rocket: {
    color: 'rgb(198, 29, 3)',
    text: 'Rocket',
    clicked() {
      let startAnimation = Date.now()

      isPaused = false
      // set particle Settings
      Psettings.gravity = new Vec2(0, 0)
      
      // create particles
      let settings = {
        shape: new Vec2(20, 20),
        color: [15, 56, 168, 1]
      }
      setInterval(() => {

        for(let buttonName in buttons) {
          let button = buttons[buttonName]

          // move buttons up
          button.y -= 15

          // create particles
          for(let i=0;i<10;i++) {
            // change settings
            settings.velocity = new Vec2(getRandomRange(-1, 1), getRandomRange(0, 1))
            settings.color = [getRandomRange(0, 255),0,0,getRandomRange(0, 1)]
            let shapesize = getRandomRange(0, 30)
            settings.shape = new Vec2(shapesize, shapesize)
            settings.fadeAway = getRandomRange(500, 1000)
            settings.position = new Vec2(button.x+button.width/2, button.y+button.height)

            particles.push(new Particle(settings))
          }
        }
      }, 50)

    setTimeout(() => { window.location.href = "particles/rockets/index.html" }, 4000)
    }
  },
  snow: {
    color: 'rgb(7, 168, 193)',
    text: 'Snow'
  },
  fire: {
    color: 'rgb(255, 28, 0)',
    text: 'Fire'
  },
  raint: {
    color: 'rgb(15, 56, 168)',
    text: 'Rain'
  },
  rockett: {
    color: 'rgb(15, 56, 168)',
    text: 'Rocket'
  },
  snowt: {
    color: 'rgb(15, 56, 168)',
    text: 'Snow'
  },
  firet: {
    color: 'rgb(15, 56, 168)',
    text: 'Fire'
  }
}

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function calculateButtonsLocation() {
  let i = 0
  for(let buttonName in buttons) {
    let button = buttons[buttonName]

    let width = 220
    let height = 80
    let x = ((canvas.width/2)+((i%4)-1.5)*400)-width/2
    let y = ((canvas.height/2)+(Math.floor(i/4)-0.5)*400)-height/2

    button.x = x
    button.y = y
    button.visible = true
    button.fontSize = 40
    button.width = width
    button.height = height

    i++
  }
}

function implodeButtons() {
  // implode buttons
  let implodeButtons = setInterval(() => {
    for(let buttonName in buttons) {
      let button = buttons[buttonName]
      button.x += button.width/5/2
      button.y += button.height/5/2
      button.width -= button.width/5
      button.height -= button.height/5
      button.fontSize -= button.fontSize/5

      if(button.width < 5) {
        button.visible = false
        console.log(button)
        clearInterval(implodeButtons)
      }
    }

  }, 10)
}