var controller = new ScrollMagic.Controller()

$(() => {

  // check token params
  let params = new URLSearchParams(window.location.search) 
  if(params.has('token')) {
    let token = params.get('token')
    setCookie('token', token)
    window.history.replaceState({}, document.title, "./index.html")
  }


  checkNav()
  $(document).on('scroll', checkNav)

  // create a scene
  new ScrollMagic.Scene({ TriggerElement: '#cont1', offset: 10}).setClassToggle("#cont1", "reveal").addTo(controller)
  new ScrollMagic.Scene({ TriggerElement: '#cont2', offset: 150}).setClassToggle("#cont2", "reveal").addTo(controller)
  new ScrollMagic.Scene({ TriggerElement: '#cont3', offset: 350}).setClassToggle("#cont3", "reveal").addTo(controller)
  new ScrollMagic.Scene({ TriggerElement: '#cont3b', offset: 600}).setClassToggle("#cont3b", "reveal").addTo(controller)
  new ScrollMagic.Scene({ TriggerElement: '#cont4', offset: 900}).setClassToggle("#cont4", "reveal").addTo(controller)
	var scene = new ScrollMagic.Scene({ TriggerElement: "#cont6", offset: 1700})
					.addTo(controller)
					.on("enter", (e) => { if(!statsCounted) countStatistics() })
  // count

  addWhoUseToorney()
})

async function addWhoUseToorney() {
  let guilds = await getGuilds()
  guilds = Object.values(guilds)
  guilds.sort((a, b) => Math.random() > 0.5 ? -1 : 1)

  for(let guild of guilds) {

    //if(guild.memberCount == undefined) continue
    if(guild.name == undefined) continue

    $('#cont5').append(`        
    <div>
      <img src="${guild.icon}">
      <br>
      <a href="https://discord.gg/${guild.invite}">${guild.name}</a>
      <br>
      <span>Members: ${guild.memberCount}</span>
    </div>
    `)
  }

  let i=0
  let loop = setInterval(() => {
    i++
    $('#cont5').scrollLeft(i)
    if(i > $('#cont5').scrollLeft()) {
      addWhoUseToorney()
      clearInterval(loop)
    }
  }, 10)
}

function checkNav() { 
  let pos = $(document).scrollTop()
  if(pos > 400) $('#nav').removeClass('invisible')
  if(pos < 400) $('#nav').addClass('invisible')
}

let statsCounted = false
async function countStatistics() {
  statsCounted = true
  let tournaments = await getTournaments()
  let tournamentsAmount = Object.keys(tournaments).length
  numberAnimation('#stats-tournaments', tournamentsAmount)

  let guilds = await getGuilds()
  let guildsAmount = Object.keys(guilds).length
  numberAnimation('#stats-servers', guildsAmount)

}

function easeInOutCubic(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }

function numberAnimation(element, number) {
  let ix = 20
  let counting = setInterval(() => {
    ix++
    let iy = easeInOutCubic(ix/100)
    let num = Math.round((iy) * number)
    $(element).html(num)
    if(ix > 100) clearInterval(counting)
  }, 50)
}