$(function() {
  let k = 0
  for(let i = 0; i < 80; i++) {
    k += 15
    $('body').append(`<div class="main" id="${i}" style="left: ${k}"></div>`)
  }
  setInterval(function() {
    let WichDiv = Math.round(Math.random() * 80)
    $('#'+WichDiv).animate({'height': (Math.round(Math.random() * 200))}, 200)
  }, 1)
})
