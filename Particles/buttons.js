const buttons = {
  rain: {
    color: 'rgb(15, 56, 168)',
    text: 'Rain',
    clicked() {

      implodeButtons(5)
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
    text: 'Fire',
    clicked() {

      implodeButtons(40)
      isPaused = false
      // set particle Settings
      Psettings.gravity = new Vec2(0, 0)
      let i = 0
      let interval = setInterval(() => {
        i++
        if(i > 100) clearInterval(interval)
        for(let buttonName in buttons) {
          let button = buttons[buttonName]

          // create particles
          for(let i=0;i<20;i++) {
            let side = Math.floor(Math.random()*4)
            // change settings
            let settings = {}
            settings.velocity = new Vec2(getRandomRange(-0.5, 0.5), getRandomRange(-0.5, 0.5))
            settings.color = [getRandomRange(0, 255),0,0,getRandomRange(0, 1)]
            let shapesize = getRandomRange(0, 10)
            settings.shape = new Vec2(shapesize, shapesize)
            settings.fadeAway = getRandomRange(300, 800)

            // position
            if(side == 0) settings.position = new Vec2(button.x+getRandomRange(0, button.width), button.y) // north
            if(side == 1) settings.position = new Vec2(button.x+button.width, button.y+getRandomRange(0, button.height)) // east
            if(side == 2) settings.position = new Vec2(button.x+getRandomRange(0, button.width), button.y+button.height) // south
            if(side == 3) settings.position = new Vec2(button.x, button.y+getRandomRange(0, button.height)) // west

            particles.push(new Particle(settings))
          }
        }
      }, 10)
      setTimeout(() => { window.location.href = "particles/fire/index.html" }, 3000)
    }
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

function implodeButtons(speed) {
  // implode buttons
  let implodeButtons = setInterval(() => {
    for(let buttonName in buttons) {
      let button = buttons[buttonName]
      button.x += button.width/speed/2
      button.y += button.height/speed/2
      button.width -= button.width/speed
      button.height -= button.height/speed
      button.fontSize -= button.fontSize/speed

      if(button.width < 25) {
        button.visible = false
        console.log(button)
        clearInterval(implodeButtons)
      }
    }

  }, 10)
}