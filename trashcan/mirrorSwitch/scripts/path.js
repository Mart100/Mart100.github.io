// remove obstacles that are out of screen
setInterval(() => {
  for(let p in path) {
    if(p < length-1000) delete path[p] 
  }
}, 1000)

function addWall() {
  path[length+1000] = {
    side: (Math.random() > 0.5 ? 'right' : 'left'),

  }
} 