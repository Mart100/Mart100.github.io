let firestore = firebase.firestore()

// on page load
$(() => {

  // read news from database
  firestore.collection("news").get().then((querySnapshot) => {
    let articles = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      articles.push(data)
    })
    // sort articles on date
    articles.sort((a, b) => { return b.date.seconds-a.date.seconds })

    for(let article of articles) addArticle(article)
  })

})


function addArticle(article) {
  console.log(article)
  article.text = article.text.replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let html = `
  <div class="article">
    <span class="title">${article.title}</span><span class="by">by: ${article.by}</span>
    <p class="text">${article.text}</p>
  </div>
  `
  
  $('#newsContainer').append(html)
}