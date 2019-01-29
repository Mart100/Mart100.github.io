let searchMiddle = true

// on page load
$(() => {

  // on loop click
  $('#searchSubmit').on('click', () => {
    search($('#searchField').val())
  })
})


function search(input) {
  if(input == "") return
  if(searchMiddle) searchAnimation()
  $('#results').html('')
  
  // search and add new results
  if(searchMiddle) setTimeout(() => { search(input) }, 700)
  else searchSnippets(input)
}

function searchAnimation() {

  // remove title
  $('#title').animate({'top': '42%'}, 200, () => { $('#title').css('display', 'none')})

  // set search bar to corner
  $('#search').animate({'top': `-${window.innerHeight-100}px`, 'left': `-${window.innerWidth-600}px`}, 400, () => {

    // make results appear
    $('#results').animate({'height': '10px'}, 100)
    $('#results').animate({'width': `${window.innerWidth-200}px`, 'padding': '0 100'}, 300)
    $('#results').animate({'height': `${window.innerHeight-150}px`, 'padding': '50 100 0 100'}, 300)
  })

  setTimeout(() => {searchMiddle = false}, 100)
}

function searchSnippets(input) {
  let sortedSnippets = []
  // loop trough snippets
  for(let snippet of snippets) {
    let score = 0

    // loop trough keywords
    for(let keyword of snippet.keywords) {
      if(input.includes(keyword)) score++
    }
    
    snippet.score = score

    // add snippet to sortedSnippets
    sortedSnippets.push(snippet)

  }
  // sort sortedSnippets
  sortedSnippets.sort((a, b) => b.score-a.score)

  // Send first 10
  for(let i=0; i<10; i++) {
    if(sortedSnippets[i] == undefined) continue
    if(sortedSnippets[i].score == 0) continue
    sortedSnippets[i].num = i
    loadSnippet(sortedSnippets[i])
  }

  // log snippets
  console.log(sortedSnippets)

  // PrettyPrint all
  PR.prettyPrint()

  // If first result is score 0. No results
  if(sortedSnippets[0].score == 0) {
    $('#results').html(`<span class="snippetTitle">Coudnt find any snippets that match your input :(</span>`)
  }
}

function loadSnippet(snippet) {
  $('#results').append(`
  <div id="snippet-${snippet.num}">
    <span class="snippetTitle">${snippet.title}</span>
    <pre class="prettyprint snippetCode">${snippet.code}</pre>
  </div>
  `)
}