function frame() {

  window.requestAnimationFrame(frame)

	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw texts
  for(let t of map.texts) t.draw()

  // draw lines
  ctx.lineWidth = 2
  for(let l of map.lines) l.draw()



  // draw selected
  let selectedType = selected.split('-')[0]
  let selectedID = selected.split('-')[1]

  if(selectedType == 'text') map.texts.find((t) => t.id == selectedID).drawSelected()
  
  if(selectedType == 'line') map.lines.find((l) => l.id == selectedID).drawSelected()
}