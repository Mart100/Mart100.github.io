let inventoryDragItem = {
	type: 'none',
	dragging: false,
	down: false,
	startDrag: new Vector(),
	dragOffset: new Vector()
}
let mousePos = new Vector()
let playerInvRenderInterval
let inventoryOpen = false
let itemSlotHover = null
let playerInvRenderCanvas = document.createElement("canvas")
let playerInvRenderCtx = playerInvRenderCanvas.getContext('2d')

function toggleInventory() {
	if($('#inventory')[0]) hideInventory()
	else showInventory()
}

function hideInventory() {
	inventoryOpen = false
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

	$('body').on('keydown', (e) => {
		if(!inventoryOpen) return
		if(itemSlotHover == null) return
		let slot = itemSlotHover
		let items = getInventoryItems()
		let item = items[slot]
		if(!item) item = {}
		let itemType = item.itemType
		let key = Number(e.key)
		if(key > -1 && key < 10) {
			key--
			world.player.hotbar[key] = itemType
			updateHotbar()
		}	
		
	})

	$('body').on('mousemove', (event) => {
		mousePos = new Vector(event.clientX, event.clientY)
		if(inventoryDragItem.down) {
			let diff = mousePos.clone().minus(inventoryDragItem.startDrag).getMagnitude()
			if(diff > 20) {
				inventoryDragItem.dragging = true
				if(!$('#inventoryDragItem')[0]) {
					let itemType = inventoryDragItem.type
					let itemImage = assets.images.items[itemType] || assets.images.weapons[itemType]
					$('body').prepend(`<div id="inventoryDragItem"><img src="${itemImage.src}"/></div>`)
				}
				let itemPos = mousePos.clone().minus(32)
				$('#inventoryDragItem').css({'left': `${itemPos.x}px`, 'top': `${itemPos.y}px`})
			}
		}
	})

	$('body').on('mouseup', (event) => {
		if(inventoryDragItem.down) {
			inventoryDragItem.dragging = false
			inventoryDragItem.down = false
			let origin = inventoryDragItem.origin
			//console.log('yass')
			if(origin && origin[0] == 'H') {
				let originSlot = Number(origin.replace('H', ''))
				world.player.hotbar[originSlot] = 0
				updateHotbar()
			}
			inventoryDragItem.origin = ''
			$('#inventoryDragItem').remove()
		}
	})
	$('#canvas').on('click', (event) => {
		if(inMouseHand != 'grenade') return
		if(event.which == 1) {
			throwGrenade()
		}
	})
	$('#canvas').on('contextmenu', (event) => {
		if(event.which == 3 && inMouseHand == 'grenade') {
			inMouseHand = 'none'
			world.player.inventory.push('grenade')
			updateHotbar()
		}
	})
})

function getInventoryItems() {
	// slots
	let items = []
	for(let itemType of world.player.inventory) {
		let i = items.find(i => i.itemType == itemType)
		if(i) i.amount++
		else {
			items.push({itemType: itemType, amount: 1})
		}
	}
	return items
}

let inMouseHand = 'none'
function useItem(itemtype) {
	let removeItem = false

	if(!world.player.inventory.includes(itemtype)) return

	// do things
	if(itemtype == 'bandages') {
		if(world.player.health == world.player.maxHealth) return
		world.player.heal(25)
		assets.sounds.bandage.volume(2)
		assets.sounds.bandage.play()
		removeItem = true
	}
	if(itemtype == 'speed-potion') {
		let res = world.player.applyEffect('speed', 2, 10000)
		if(!res) return
		assets.sounds.potion.play()
		removeItem = true
	}
	if(itemtype == 'grenade') {
		inMouseHand = 'grenade'
		removeItem = true
	}

	// remove item
	if(removeItem) {
		let p = world.player.inventory.find(i => i == itemtype)
		let idx = world.player.inventory.lastIndexOf(p)
		world.player.inventory.splice(idx, 1)
	}

	if(inventoryOpen) showInventory()
	updateHotbar()
}
async function showInventory() {
	if($('#inventory')[0]) hideInventory()
	inventoryOpen = true
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
		$('#inventory .itemSlots').append(`<div class="item" tabindex="0" id="itemSlot-${i}"></div>`)
		if(itemType) {
			$(`#inventory #itemSlot-${i}`).append(`<img draggable="false" src="${itemImage.src}"/>`)
			$(`#inventory #itemSlot-${i}`).append(`<div class="container"><div class="amount">${itemAmount}</div></div>`)
		}
	}
	$('#inventory .itemSlots .item').off('mousedown').on('mousedown', (event) => {
		let id = event.target.id
		//console.log('yasss', event)
		let slot = Number(id.split('-')[1])
		let item = items[slot]
		if(!item) return
		inventoryDragItem.type = item.itemType
		inventoryDragItem.down = true
		inventoryDragItem.startDrag = new Vector(event.clientX, event.clientY)
		inventoryDragItem.dragOffset = new Vector(event.offsetX, event.offsetY)
	})


	$("#inventory .itemSlots .item").on("mouseover", (e) => {
		let id = e.target.id
		let slot = Number(id.split('-')[1])
		itemSlotHover = slot
	}).on("mouseout", () => {
		itemSlotHover = null
	})

	$('#inventory .itemSlots .item').off('mouseup').on('mouseup', (event) => {
		let id = event.target.id
		
		let slot = Number(id.split('-')[1])
		let item = items[slot]
		if(!item) return
		let itemType = item.itemType
		//console.log(id, itemType)
		useItem(itemType)
	})

	$('body').prepend('<div id="backgroundOpacity" style="width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); position: absolute; top: 0px;"></div>')
	$('#backgroundOpacity').css({
		"width": "100%", "height": "100%", "background-color": "rgba(0,0,0,0.5)", "position": "absolute", "top": "0px", "pointer-events": "none"
	})
}