$(() => {

  if(db == undefined) db = firebase.firestore()

  // load save
  let urlParams = new URLSearchParams(location.search)
  if(urlParams.has('save')) loadSave(urlParams.get('save'))


  // on save button
  $('#save-button').on('click', () => { saveMap() })
})

function saveMap() {

  $('#save-button').html('Saving...')

  let data = {
    lines: [],
    texts: []
  }

  // add lines
  for(let l of map.lines) {

    // check if is duplicate
    let isDuplicate = false
    for(let l1 of data.lines) if(l1.pos1.x == l.pos1.x && l1.pos1.y == l.pos1.y && l1.pos2.x == l.pos2.x && l1.pos2.y == l.pos2.y) isDuplicate = true
    if(isDuplicate) continue

    // if pos1 == pos2. 
    if(l.pos1.clone().minus(l.pos2).getMagnitude() == 0) continue

    // push to data
    data.lines.push(l.export())
  }

  // add Texts
  for(let t of map.texts) {

    // check if is duplicate
    let isDuplicate = false
    for(let t1 of data.texts) if(t1.position.x == t.position.x && t1.position.y == t.position.y && t.text == t1.text) isDuplicate = true
    if(isDuplicate) continue

    // if empty
    if(t.text.length == 0) continue

    // push to data
    data.texts.push(t.export())
  }

  let token = randomToken(10)

  db.collection("mindMap").doc(token).set(data)
  .then(() => {
    $('#save-button').html('Saved!')

    location = '?save='+token
    
    setTimeout(() => {
      $('#save-button').html('Save')
    }, 3000)
  })
}

function loadSave(token) {
  db.collection("mindMap").doc(token).get().then((doc) => {
    let save = doc.data()

    map.lines = []
    map.texts = []

    for(let l of save.lines) {
      let newLine = new Line(l.pos1, l.pos2)
    }

    for(let t of save.texts) {
      let newText = new Text(t.position)
      newText.text = t.text
      newText.size = t.size
    }

  })
}