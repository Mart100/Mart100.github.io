// on page load
$(() => {

  // read weapons from API
  $.get('https://hrinfo-api.herokuapp.com/weapons', (data) => { 
    let weapons = data
    for(let i in weapons) addWeapon(weapons[i])
  })
})


function addWeapon(weapon) {

  let rgbColor = rarityToRGB(weapon.rarity)


  let html = `
  <div class="weapon" id="weapon-${weapon.name}">
    <img src="${weapon.image}" style="background-color: rgba(${rgbColor.toString()}, 0.5)"/>
    <div class="bar">
      <div class="name">${weapon.name}</div>
    </div>
  </div>
  `
  $('#weapons').append(html)

  $(`#weapon-${weapon.name}`).on('mouseenter', () => {
    $(`#weapon-${weapon.name} .bar`).addClass("extended")
    let extraInfo = ``

    extraInfo += `<span style="display: none;">magazine: ${weapon.magazine}</span><br><br>`
    extraInfo += `<span style="display: none;">damage: ${weapon.damage}</span><br><br>`
    extraInfo += `<span style="display: none;">rarity: <span style="color: rgb(${rgbColor.toString()})">${weapon.rarity}</span></span><br><br>`
    extraInfo += `<span style="display: none;">type: ${weapon.type}</span><br><br>`
    if(weapon.pellets != undefined) extraInfo += `<span style="display: none;">pellets: ${weapon.pellets}</span><br>`
    $(`#weapon-${weapon.name} .bar`).append(extraInfo)
    
    
    
    $(`#weapon-${weapon.name} span`).fadeIn(300)

  })

  $(`#weapon-${weapon.name}`).on('mouseleave', () => {
    $(`#weapon-${weapon.name} .bar`).removeClass("extended")
    $(`#weapon-${weapon.name} span`).fadeOut(300, () => {
      $(`#weapon-${weapon.name} .bar`).html(`<div class="name">${weapon.name}</div>`)
    })
  })
}

function rarityToRGB(rarity) {
  let rgb = [0,0,0]

  if(rarity == 'common') rgb = [162,162,162]
  if(rarity == 'rare') rgb = [52,53,182]
  if(rarity == 'unique') rgb = [163,28,171]
  if(rarity == 'legendary') rgb = [204,139,25]

  return rgb
}