function getUserData() {
  return new Promise((resolve, reject) => {
    let url = 'https://discordapp.com/api/users/@me'
    let token = getCookie('token')
    if(token == "") return

    $.ajax({
      url: url,
      type: 'GET',
      contentType: 'json',
      beforeSend(xhr) {
        xhr.setRequestHeader ("Authorization", `Bearer ${token}`)
      },
      success(data) {
        resolve(data)
      },
      error(request, status, error) {
        console.log(request.responseText, error)
        deleteCookie('token')

        setTimeout(() => { window.location = '../login' }, 500)
        resolve()
      }
    })
  })
}

// https://stackoverflow.com/questions/2794137/sanitizing-user-input-before-adding-it-to-the-dom-in-javascript
function XSS(s) {
  if(s == undefined) return
  s = s.toString()
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}