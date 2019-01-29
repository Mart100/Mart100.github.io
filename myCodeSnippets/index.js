let searchMiddle = true

// on page load
$(() => {

  // on loop click
  $('#searchSubmit').on('click', () => {
    let input = $('#searchField').val()
    if(input == "") return
    if(searchMiddle) searchAnimation()
  })
})

function searchAnimation() {
  searchMiddle = false
  $('#search').animate({'top': `-${window.innerHeight-100}px`, 'left': `-${window.innerWidth-600}px`}, 800)
}

function search(input) {

}