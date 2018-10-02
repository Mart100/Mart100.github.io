$(function() {
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  $(".SUBMIT").click(function() {
    $(".code").text('CODE: ')
    let Code = ''
    let charnum = 0
    if($("#numbersC").prop('checked')) charnum = 1
    if($("#charactersC").prop('checked')) charnum = 2
    if($("#numbersC").prop('checked') && $("#charactersC").prop('checked')) charnum = 3
    if(charnum == 0) {
      $(".code").append('CHECK THE DAMN RADIO\'S')
      return
    }
    for(let i = 0; i < $("#length").val(); i++) {
      if(charnum == 1 || (charnum == 3 && Math.random() < 0.5)) Code += Math.round(Math.random() * 10)
      else Code += alphabet[Math.round(Math.random() * 25)]
    }
    $(".code").append(Code)
  })
})
