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
    texts: [],
    shapes: []
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

  // add Shapes
  for(let s of map.shapes) {

    // check if is duplicate
    let isDuplicate = false
    for(let s1 of data.shapes) if(s1.pos1.x == s.pos1.x && s1.pos1.y == s.pos1.y && s1.pos2.x == s.pos2.x && s1.pos2.y == s.pos2.y) isDuplicate = true
    if(isDuplicate) continue

    // if pos1 == pos2. 
    if(s.pos1.clone().minus(s.pos2).getMagnitude() == 0) continue

    // push to data
    data.shapes.push(s.export())
  }

  console.log(data)

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
    map.shapes = []

    for(let l of save.lines) new Line().import(l)
    for(let t of save.texts) new Text().import(t)
    for(let s of save.shapes) new Shape().import(s)

  })
}