function toggleInventory() {
  if($('#inventory')[0]) hideInventory()
  else showInventory()
}

function hideInventory() {
  $('#inventory').remove()
  $('#backgroundOpacity').remove()
}

$(() => {
  $('#HUD').on('click', (event) => {
    if(event.target.id == 'HUD') {
      event.preventDefault()
      event.stopPropagation()
      return false
    }
  })
})
let playerInvRenderInterval
let playerInvRenderCanvas = document.createElement("canvas")
let playerInvRenderCtx = playerInvRenderCanvas.getContext('2d')
async function showInventory() {
  clearInterval(playerInvRenderInterval)
  playerInvRenderInterval = setInterval(() => {
    let windowSize = world.rendering.windowSize
    let imgData = world.rendering.ctx.getImageData(windowSize.x/2-50, windowSize.y/2-50, 100, 100)
    playerInvRenderCanvas.width = imgData.width
    playerInvRenderCanvas.height = imgData.height
    playerInvRenderCtx.putImageData(imgData, 0, 0)
    let dataURL = playerInvRenderCanvas.toDataURL()
    $('#inventory .playerCapture').attr('src', `${dataURL}`)
  }, 100)

  
  $('#HUD').append('<div id="inventory"> </div>')

  $('#inventory').append('<img class="background" src="./assets/HUD/inventory.png"></img>')

  $('#inventory').append(`<img class="playerCapture" src=""></img>`)

  // slots
  let items = []
  for(let itemType of world.player.inventory) {
    let i = items.find(i => i.itemType == itemType)
    if(i) i.amount++
    else {
      items.push({itemType: itemType, amount: 1})
    }
  }

  $('#inventory').append('<div class="itemSlots"></div>')

  for(let i=0;i<2*6;i++) {
    let item = items[i]
    if(!item) item = {}
    let itemType = item.itemType
    let itemAmount = item.amount
    let itemImage = assets.images.items[itemType] || assets.images.weapons[itemType]
    $('#inventory .itemSlots').append(`<div class="item" id="itemSlot-${i}"></div>`)
    if(itemType) {
      $(`#inventory #itemSlot-${i}`).append(`<img draggable="false" src="${itemImage.src}"/>`)
      $(`#inventory #itemSlot-${i}`).append(`<div class="container"><div class="amount">${itemAmount}</div></div>`)
    }
  }

  $('#inventory .itemSlots .item').off().on('click', (event) => {
    let id = event.target.id
    console.log(event, id)
    let slot = Number(id.split('-')[0])
    let item = items[slot]
    let itemType = item.itemType
    if(itemType == 'bandages') {
      let p = world.player.inventory.find(i => i == itemType)
      let idx = world.player.inventory.lastIndexOf(p)
      world.player.inventory.splice(idx, 1)
      world.player.heal(25)
    }
  })

  $('body').prepend('<div id="backgroundOpacity" style="width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); position: absolute; top: 0px;"></div>')
  $('#backgroundOpacity').css({
    "width": "100%", "height": "100%", "background-color": "rgba(0,0,0,0.5)", "position": "absolute", "top": "0px", "pointer-events": "none"
  })
}