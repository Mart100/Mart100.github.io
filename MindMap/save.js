$(() => {

  // load save
  let urlParams = new URLSearchParams(location.search)
  if(urlParams.has('save')) loadSave(urlParams.get('save'))


  // on save button
  $('#save-button').on('click', () => {

    let compressedSave = getCompressedSave()
    location.href = `?save=${compressedSave}`

  })
})

function getCompressedSave() {
  let data = {
    lines: map.lines,
    texts: map.texts
  }

  console.log(data)

  let compressed = JSONC.pack(data) 

  console.log(compressed)
  

  return compressed
}

function loadSave(compressedSave) {
  console.log(compressedSave)
  let save = JSONC.unpack(compressedSave)

  console.log(save)

  map.lines = save.lines
  map.texts = save.texts
}