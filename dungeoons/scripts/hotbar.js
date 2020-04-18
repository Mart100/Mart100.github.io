$(() => {
	$('body').on('keydown', (e) => {
		if(inventoryOpen) return
		let key = Number(e.key)
		if(key > -1 && key < 10) {
			key--
			let itemtype = world.player.hotbar[key]
			if(itemtype) useItem(itemtype)
		}
		
	})
})


function updateHotbar() {
	let hotbarSize = 9
	$('#hotbar').html('')
	let items = getInventoryItems()
	for(let i=0;i<hotbarSize;i++) {
		let itemtype = world.player.hotbar[i]
		let invItem = items.find(i => i.itemType == itemtype)
		let itemImage = assets.images.items[itemtype] || assets.images.weapons[itemtype]
		$('#hotbar').append(`<div class="slot" id="hotbarSlot-${i}"><div class="cont"></div></div>`)
		if(itemImage) $(`#hotbarSlot-${i} .cont`).append(`<img src="${itemImage.src}">`)
		if(invItem && invItem.amount) $(`#hotbarSlot-${i} .cont`).append(`<span class="amount">${invItem.amount}</span>`)
		if(!invItem || !invItem.amount || (invItem && invItem.amount && invItem.amount == 0)) {
			$(`#hotbarSlot-${i} img`).css('filter', 'grayscale(0.7)')
		}
		
	}
	$('#hotbar .slot').off('click').on('click', (event) => {
		if(inventoryOpen) return
		let slot = Number(event.target.id.replace('hotbarSlot-', ''))
		let itemtype = world.player.hotbar[slot]
		if(itemtype) useItem(itemtype)
		updateHotbar()
	})
	$('#hotbar .slot').off('mouseup').on('mouseup', (event) => {
		if(!inventoryOpen) return
		let slot = Number(event.target.id.replace('hotbarSlot-', ''))
		console.log(event)
		if(inventoryDragItem.dragging) {
			let itemType = inventoryDragItem.type
			let idx = world.player.hotbar.indexOf(itemType)
			if(idx > -1) world.player.hotbar[idx] = 0
			world.player.hotbar[slot] = itemType
			updateHotbar()
		}
	})

	$('#hotbar .slot').off('mousedown').on('mousedown', (event) => {
		if(!inventoryOpen) return
		let slot = Number(event.target.id.replace('hotbarSlot-', ''))
		let item = world.player.hotbar[slot]
		inventoryDragItem.type = item
		inventoryDragItem.down = true
		inventoryDragItem.origin = `H${slot}`
		inventoryDragItem.startDrag = new Vector(event.clientX, event.clientY)
		inventoryDragItem.dragOffset = new Vector(event.offsetX, event.offsetY)
	})
}