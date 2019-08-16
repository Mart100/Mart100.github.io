function frame() {

  window.requestAnimationFrame(frame)

  ctx.save();
  ctx.setTransform(1,0,0,1,0,0);
  // Will always clear the right space
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.restore();

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