let map = {
  lines: [],
  texts: [],
  shapes: [],
  offset: new Vector(),
  zoom: 1
}
let history = []
let db
let selected = 'none'
let mode = 'none'

let modes = {
  pan: {
    start: new Vector(),
    previousOffset: new Vector(),
  },
  line: {
    dragging: 0
  },
  text: {
    lastCursorMove: 0,
    dragging: 0,
  },
  shape: {
    type: 'rectangle',
    dragging: 0
  }
}

$(() => {

  if(db == undefined) db = firebase.firestore()

  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  ctx.translate(0.5, 0.5)

  frame()

  settingChanges()

  $('#sidePanel .mode-button').on('click', (event) => {

    let buttonClicked = event.target.id.replace('-button', '')
    setMode(buttonClicked)
  })
})

function randomToken(l) {
  let s = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let output = ''
  for(let i=0;i<l;i++) output += s[Math.floor(Math.random()*s.length)]
  return output
}

function getSelected() {
  let type = selected.split('-')[0]
  let id = selected.split('-')[1]

  if(type == 'line') return map.lines.find((t) => t.id == id)
  if(type == 'text') return map.texts.find((t) => t.id == id)
  if(type == 'shape') return map.shapes.find((t) => t.id == id)

  return 'none'
}

function setMode(to) {

  mode = to
  selected = 'none'

  $(`#sidePanel div`).removeClass('selected')
  $(`#sidePanel #${mode}-button`).addClass('selected')
  
  if(mode == 'text') $('#canvas').css('cursor', 'text')
  if(mode == 'line') $('#canvas').css('cursor', 'default')
  if(mode == 'shape') $('#canvas').css('cursor', 'default')
  if(mode == 'pan') $('#canvas').css('cursor', 'grab')
  if(mode == 'selector') $('#canvas').css('cursor', 'default')

  showSettings(mode)

}

function getMouseVector(event) {
  return new Vector(event.clientX, event.clientY)
}

function getSelectedType() {
  return selected.split('-')[0]
}

function saveHistory(element) {
  console.log(element)
  history.push(element.export({id: true, what: true}))
}