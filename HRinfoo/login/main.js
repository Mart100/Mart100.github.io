$(() => {
  let params = window.location.search.substr(1)
  let token = params.replace('token=', '')
  if(token != "") {
    $('body').html('You are being redirected to <a href="../">hrsite.xyz</a>')
    setCookie('token', token, 1000)
    setTimeout(() => { window.location = '../' }, 1000)
  }
  else {
    $('body').html('Use ,connectsite in a discord server that has the HRinfo bot. To use this feature')
  }
})
