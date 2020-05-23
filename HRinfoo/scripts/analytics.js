// on page load
$(() => {

  // load google analytics
  let trackingCookie = getCookie('tracking')
  console.log('tracking: ', trackingCookie)
  if(trackingCookie == "") {
    setCookie('tracking', "true")
    trackingCookie = "true"
  }

  if(trackingCookie == "true") {
    window.dataLayer = window.dataLayer || []
    function gtag(){dataLayer.push(arguments)}
    gtag('js', new Date())
    gtag('config', 'UA-140200727-1')
  } 

  // if tracking disabled
  else {
    console.log('yayeet')
    $('#tracking').html(`
    You have tracking using google analytics disabled! :(<br>
    Consider enabling it to help out the developer: <button onclick="optinTracking()">Enable</button>
    `)
  }
})


function optoutTracking() {
  setCookie('tracking', "false")
  location.reload()
}

function optinTracking() {
  setCookie('tracking', "true")
  location.reload()
}