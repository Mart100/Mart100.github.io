
let currentTileInfo = {x: 0, y: 0}
function displayTileInfo() {
  let pos = world.grid.windowToGridPos(mouse.pos.x, mouse.pos.y)
  let x = pos.x
  let y = pos.y

  if(x == currentTileInfo.x && y == currentTileInfo.y) return

  currentTileInfo.x = x
  currentTileInfo.y = y

  let tile = world.grid.getTile(x, y)

  let html = `
    PosX: ${x}<br>
    PosY: ${y}<br>
    Types: ${tile.types}<br>
  `

  if(tile.roomType) html += `roomType: ${tile.roomType}<br>`
  
  if(tile.roomType) {
    let room = world.findRoomByTile(tile)
    if(room.slots) html += `room slots: ${Math.floor(room.slots)}<br>`
    if(room.connectons) html += `room connectons: ${room.connectons.map(c => c.name).join('  ')}<br>`
  }


  $('#tileinfo').html(html)
}
