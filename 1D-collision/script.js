let blocks = [ {x: -450, speed: 1, mass: 1}, {x: 450, speed: 3, mass: 2} ]
let process
let isPaused = false
$(function () {
  // process
  process = setInterval(() => {
    if(isPaused) return
    // add speed
    blocks[0].x += blocks[0].speed
    blocks[1].x += blocks[1].speed
    // set new blocks x
    $('#block0').css('transform', `translateY(-50%) translateX(${-50+blocks[0].x}%)`)
    $('#block1').css('transform', `translateY(-50%) translateX(${-50+blocks[1].x}%)`)    
    // update text inside
    $('#block0').html(`Speed: ${Math.round(blocks[0].speed*1000)/1000}<br>Mass: ${blocks[0].mass}`)
    $('#block1').html(`Speed: ${Math.round(blocks[1].speed*1000)/1000}<br>Mass: ${blocks[1].mass}`)
    // check for collision
    if(blocks[0].x+101 > blocks[1].x) {
      let NEWblock0SPEED = (blocks[0].speed * (blocks[0].mass - blocks[1].mass) + 2 * (blocks[1].mass * blocks[1].speed)) / (blocks[0].mass + blocks[1].mass)
      let NEWblock1SPEED = (blocks[1].speed * (blocks[1].mass - blocks[0].mass) + 2 * (blocks[0].mass * blocks[0].speed)) / (blocks[0].mass + blocks[1].mass)
      blocks[0].speed = NEWblock0SPEED
      blocks[1].speed = NEWblock1SPEED
    }
    // check for walls                          
    if(blocks[0].x < -450) blocks[0].speed = -blocks[0].speed
    if(blocks[1].x > 450) blocks[1].speed = -blocks[1].speed
  }, 10)
})
function refresh() {
  blocks = [ {x: -400, speed: Number($('#block0speed').val()), mass: Number($('#block0mass').val())}, {x: 400, speed: Number($('#block1speed').val()), mass: Number($('#block1mass').val())} ]
  // set new blocks x
  $('#block0').css('transform', `translateY(-50%) translateX(${-50+blocks[0].x}%)`)
  $('#block1').css('transform', `translateY(-50%) translateX(${-50+blocks[1].x}%)`)    
  // update text inside
  $('#block0').html(`Speed: ${Math.round(blocks[0].speed*1000)/1000}<br>Mass: ${blocks[0].mass}`)
  $('#block1').html(`Speed: ${Math.round(blocks[1].speed*1000)/1000}<br>Mass: ${blocks[1].mass}`)
}
function pause() {
  if(isPaused) {
    isPaused = false
    $('#buttonPAUSE').html('Unpause')
  } else {
    isPaused = true
    $('#buttonPAUSE').html('Pause')
  }
  
}