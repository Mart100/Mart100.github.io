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

  let token = randomToken(10)

  db.collection("mindMap").doc(token).set({
    'lines': JSON.parse(JSON.stringify(map.lines)),
    'texts': JSON.parse(JSON.stringify(map.texts))
  })
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

    map.lines = save.lines
    map.texts = save.texts
  })
}