let startTime = 0
let endTime = 0
let wordsCount = 0
let totalWords = 50

let intervalLoop

$(() => {
  drawGradient()
  focusInput()
  inputHandler()
  onLoad()
  loadText()
  intervalRunner()
})

function onLoad() {
  $('#input').html('')
}

function inputHandler() {
  $(document).on('keydown', (event) => {
    
    if(event.key == 'Backspace') event.preventDefault()

    if(endTime != 0) return
    let input = $('#input').html()
    let char = event.key

    if(startTime == 0) startTime = Date.now()

    if(char.length > 1) return    

    let text = $('#text').html()
    text = text.replace('&nbsp;', ' ')
    if(text[0] == char) {
      text = text.substr(1)
      text = text.replace(/ /g, '&nbsp;')
      $('#text').html(text)
      if(text[0] == '&') {
        wordsCount += 1
        if(wordsCount == totalWords) {
          endTime = Date.now()
          clearInterval(intervalLoop)
        }
        $('#wordCount .num').html(`${wordsCount} / ${totalWords}`)
      }
      if(char == ' ') return $('#input').append('&nbsp;')
      $('#input').append(char)
    } else {
      input += `<span style="color:red;">${char}</span>`
      $('#input').html(input)
    }
  })
}

function intervalRunner() {
  intervalLoop = setInterval(() => {
    if(startTime == 0) return
    let now = Date.now()
    let diff = now-startTime
    let secElapsed = Math.floor(diff/1000)
    $('#timeElapsed .num').html(secElapsed)
    let WPM = Math.floor((wordsCount/(diff/1000))*60)
    $('#wordsPerMin .num').html(WPM)
  }, 100)
}

function loadText() {
  let text = ''
  for(let i=0;i<totalWords;i++) text += randomWord() + ' '
  $('#text').html(text)
}

function focusInput() {
  $('#input').focus()
  $('#input').on('blur', () => {
    setTimeout(() => {
      $('#input').focus()
    }, 10)
  })
}

function drawGradient() {
  let c = document.getElementById("canvas")
  let ctx = c.getContext("2d")

  c.width = window.innerWidth
  c.height = window.innerHeight

  let grd = ctx.createLinearGradient(0, 0, c.width, c.height)
  grd.addColorStop(0, 'rgb(100, 50, 255)')
  grd.addColorStop(1, "rgb(50, 255, 100)")

  ctx.fillStyle = grd
  ctx.fillRect(0, 0, c.width, c.height)
}

function randomWord() {
  return words[Math.floor(Math.random()*words.length)]
}