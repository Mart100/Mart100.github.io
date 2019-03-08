let canvas, ctx
let raindrops = []
let settings = {
  speed: 0.5,
  amount: 1000,
  wind: {
    enabled: false,
    speed: 4,
    direction: 'right'
  }
}
let backgrounds = {
  forest: `https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Ffantastiskpodd.se%2Fwp-content%2Fuploads%2F2016%2F10%2FJungle-path-Wallpapers-HD-Pictures.jpg&f=1`,
  city: `http://gservo.com/wp-content/uploads/2014/08/wpid-dsc04031.jpg`,
  landscape: `http://www.yorkshiredales.org.uk/__data/assets/image/0006/508758/barnlandscape-rogercope.jpg`
}
let Coms = new ComsConsole()

$(function() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  frame()
  setInterval(() => { tick() }, 10)
})


// Commands
Coms.addCommand(new ComsCommand(Coms, 'speed', 'number', (num) => {
  settings.speed = num
  return `Speed set to: [${num}]`
}))

Coms.addCommand(new ComsCommand(Coms, 'amount', 'number', (num) => {
  settings.amount = num
  return `Amount set to: [${num}]`
}))

Coms.addCommand(new ComsCommand(Coms, 'reset', 'none', (num) => {
  raindrops = []
  return `Raindrops Resetted`
}))

// Wind commands
Coms.addCommand(new ComsCommand(Coms, 'wind', 'boolean', (bool) => {
  settings.wind.enabled = bool
  return `Wind set to: `+bool
}))
Coms.getCommand(['wind']).addSubCommand(new ComsCommand(Coms, 'direction', 'string', (string) => {
  if(string != 'left' && string != 'right') return 'ERR: direction must be left/right'
  settings.wind.direction = string
  return 'Set wind direction to '+string
}))
Coms.getCommand(['wind']).addSubCommand(new ComsCommand(Coms, 'speed', 'number', (num) => {
  settings.wind.speed = num
  return 'Set wind speed to '+num
}))

// Backgrounds
Coms.addCommand(new ComsCommand(Coms, 'background', 'string', (string) => {
  let background = backgrounds[string]
  $('#background').attr('src', background)
  return `Raindrops Resetted`
}))
