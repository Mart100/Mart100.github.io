$(function() {
  $('#Submit').click(function() { Start() })

})
let CurrentText
let top10Text
let Elem
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
const punctuation = ['!','?','.',',','/',')','(','|','+','-','*',':',';']
const Calculate = {
  Characters() {
    return CurrentText.length
  },
  Words() {
    return CurrentText.split(' ').length
  },
  Sentences() {
    let i = 0
    i += CurrentText.split('.').length -1
    i += CurrentText.split('!').length -1
    i += CurrentText.split('?').length -1
    return i
  },
  MostUsedCharacter() {
    let AllCharacters = {'a': 0,'b': 0,'c': 0,'d': 0,'e': 0,'f': 0,'g': 0,'h': 0,'i': 0,'j': 0,'k': 0,'l': 0,'m': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0 }
    let top10chars = []
    for(let i = 0; i < alphabet.length; i++) {
      AllCharacters[alphabet[i]] = CurrentText.split(alphabet[i]).length
    }
    // Put the values in an array
    for (let char in AllCharacters) { top10chars.push([char, AllCharacters[char]]); }
    // Sort the array
    top10chars.sort((a, b) => b[1] - a[1])
    return top10chars
  },
  Numbers() {
    let currentNumber = 0
    for(let i = 0; i < CurrentText.length; i++) {
      if(isNaN(CurrentText[i])) continue
      if(CurrentText[i] == ' ') continue
      currentNumber++
    }
    return currentNumber
  },
  MostUsedWord() {
    let AllWordsArray = Calculate.Other.GetListOfWords()
    let AllWords = {}
    let top10words = []
    let currentMostUsed = 'nothing =0'
    // Calculate how much a word is used
    for(let i = 0; i < AllWordsArray.length; i++) {
      if(AllWords[AllWordsArray[i]] == undefined) AllWords[AllWordsArray[i]] = 1
      else {
        AllWords[AllWordsArray[i]] += 1
        //console.log(AllWords[AllWordsArray[i]])
      }
    }
    // Put the values in an array
    for (let word in AllWords) { top10words.push([word, AllWords[word]]); }
    // Sort the array
    top10words.sort((a, b) => b[1] - a[1])
    return top10words
  },
  'Other': {
    GetListOfWords() {
      let Temp1 = CurrentText.toLowerCase()
      // Remove punctuations
      for(let i = 0; i < punctuation.length; i++) {
        Temp1 = Temp1.replace(punctuation[i], '')
      }
      for(let i = 0; i < 9; i++) {
        Temp1 = Temp1.replace(i, '')
      }
      Temp1 = Temp1.split(' ')
      return Temp1
    }
  }
}

async function Start() {
  CurrentText = $('#textInput').val()
  $('#STATICtotalwords').html('Total words: ' + Calculate.Words())
  $('#STATICtotalsentences').html('Total sentences: ' + Calculate.Sentences())
  $('#STATICtotalcharacters').html('Total characters: ' + Calculate.Characters())
  $('#STATICtotalnumbers').html('Total numbers: ' + Calculate.Numbers())
  $('#STATICmostusedcharacter').html('<img class="ArrowIMG" src="https://i.gyazo.com/69418326f0a9443ced54baee9bb06d93.png"/>'+' Most used character: ' + String(Calculate.MostUsedCharacter()[0]).replace(',', ' ='))
  $('#STATICmostusedcharacter img').off('click').on('click', function() { expandDiv('mostusedcharacter') })
  $('#STATICmostusedword').html('<img class="ArrowIMG" src="https://i.gyazo.com/69418326f0a9443ced54baee9bb06d93.png"/>'+' Most used word: ' + String(Calculate.MostUsedWord()[0]).replace(',', ' ='))
  $('#STATICmostusedword img').off('click').on('click', function() { expandDiv('mostusedword') })
}
function expandDiv(wich) {
  // Turn image
  Elem = '#STATIC'+wich+' img'
  $(Elem).css({'transform': 'rotate(0deg)'})
  switch(wich) {
    case('mostusedcharacter'):
      $(Elem).off('click').on('click', function() {
        $('#STATICmostusedcharacter').html('<img class="ArrowIMG" src="https://i.gyazo.com/69418326f0a9443ced54baee9bb06d93.png"/>'+' Most used character: ' + String(Calculate.MostUsedCharacter()[0]).replace(',', ' ='))
        $(Elem).css({'transform': 'rotate(90deg)'})
        $(Elem).off('click').on('click', function() { expandDiv(wich) })
      })
      top10Text = ''
      for(i = 0; i < 10; i++) {
        top10Text += `   <span>${i + 1}: ${String(Calculate.MostUsedCharacter()[i]).replace(',', ' =')}</span>   `
        if(i % 2 == 1) top10Text += '<br/>'
      }
      $('#STATICmostusedcharacter').append(`<div id="ExpandedText">${top10Text}</div>`)
      break
    case('mostusedword'):
      $(Elem).off('click').on('click', function() {
        $('#STATICmostusedword').html('<img class="ArrowIMG" src="https://i.gyazo.com/69418326f0a9443ced54baee9bb06d93.png"/>'+' Most used word: ' + String(Calculate.MostUsedWord()[0]).replace(',', ' ='))
        $(Elem).css({'transform': 'rotate(90deg)'})
        $(Elem).off('click').on('click', function() { expandDiv(wich) })
      })
      top10Text = ''
      for(i = 0; i < 10; i++) {
        top10Text += `   <span>${i + 1}: ${String(Calculate.MostUsedWord()[i]).replace(',', ' =')}</span>   `
        if(i % 2 == 1) top10Text += '<br/>'
      }
      $('#STATICmostusedword').append(`<div id="ExpandedText">${top10Text}</div>`)
        break
  }
}
