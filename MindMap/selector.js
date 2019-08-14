function select(x, y) {

  selected = findAtMouse(x, y)
}

function findAtMouse(x, y) {
  let found = 'none'

  // check if text
  for(let t of map.texts) {

    ctx.font = `${t.size}px Arial`
    let textWidth = ctx.measureText(t.text).width

    let posX = t.position.x - map.offset.x
    let posY = t.position.y - map.offset.y

    if(x < posX-(textWidth/2)) continue
    if(x > posX+(textWidth/2)) continue
    if(y < posY-(t.size/2)) continue
    if(y > posY+(t.size/2)) continue

    found = `text-${t.id}`

  }

  return found
}