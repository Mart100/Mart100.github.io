$(() => {
  $(document).on('mousemove', (event) => {

    // Get tile
    let mx = event.clientX
    let my = event.clientY
    let cz = camera.zoom
    let cpx = camera.pos.x
    let cpy = camera.pos.y

    let x = mx*(1/cz) + cpx
    let y = my*(1/cz) + cpy

    x = Math.round(x)
    y = Math.round(y)

    // if undefined. try find it    
    if(!world[x] || !world[x][y]) {
      // if zoom is too small. Give up.
      if(camera.zoom < 0.0001) $('#tileInfo').html('<b>Zoom in, To be able to see tile Info</b>')

      for(let i=0;i<100;i++) {
        x += Math.round(Math.random()*4)
        y += Math.round(Math.random()*4)
        if(world[x] && world[x][y]) i = 100
      }
    }

    if(!world[x] || !world[x][y]) return

    let tile = world[x][y]

    let html = `
    <b>
      PosX: ${x}<br>
      PosY: ${y}<br>
      Biome: ${tile.biome}<br>
      Biomes: ${JSON.stringify(tile.biomes)}<br>
    </b>
    `
    $('#tileInfo').html(html)

  })
})