let blocks = [ {x: -450, speed: 1, mass: 1}, {x: 450, speed: 3, mass: 2} ]
let settings = {
  walls: {
    right: true,
    left: true
  },
  loopAmount: 1
}
let process
let collisionCount = 0
let isPaused = true
$(function () {

  // process
  process = setInterval(() => {
    for(let i=0; i<settings.loopAmount; i++) tick()
  }, 1)

  // updateInfo
  setInterval(() => { updateInfo() })

})
function refresh() {
  collisionCount = 0
  if(!isPaused) $('#buttonPAUSE').click()
  blocks = [ {x: -400, speed: Number($('#block0speed').val()), mass: Number($('#block0mass').val())}, {x: 400, speed: Number($('#block1speed').val()), mass: Number($('#block1mass').val())} ]
  updateInfo()

}
function updateInfo() {

  // update mass and speed on blocks
  $('#block0').html(`Speed: ${Math.round(blocks[0].speed*1000)/1000}<br>Mass: ${blocks[0].mass}`)
  $('#block1').html(`Speed: ${Math.round(blocks[1].speed*1000)/1000}<br>Mass: ${blocks[1].mass}`)

  // set new blocks x
  $('#block0').css('transform', `translateY(-50%) translateX(${-50+blocks[0].x}%)`)
  $('#block1').css('transform', `translateY(-50%) translateX(${-50+blocks[1].x}%)`)    

  // update collisionCount
  $('#collisionCount').html(`${collisionCount}`)

}