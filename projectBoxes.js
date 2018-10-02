let siteLink = location.href
// date is dd/mm/jjjj
let projects = {
    snakeGame: {
        title: 'Snake Game!',
        image: 'https://i.imgur.com/QVfGknI.png',
        link: siteLink+'Snake'
      },
      galaxy: {
        title: 'Big Bang',
        image: 'https://i.gyazo.com/a891b2b1efc162ab334e245333cb9a35.png',
        link: siteLink+'galaxy'
      },
      /*primeNumbers: {
        title: 'PrimeNumbers',
        image: 'https://image.prntscr.com/image/AXbYV1rFTPmBXfnAJLVi1A.png',
        link: siteLink+'Priemnumbers'
      },*/
      rocket: {
        title: 'Rocket Particles',
        image: 'https://i.imgur.com/JGyrggs.png',
        link: siteLink+'Particles'
      },
      textStatics: {
        title: 'TextStatics',
        image: 'https://i.imgur.com/3Gjk3bv.png',
        link: siteLink+'TextStatics'
      },
      randomCode: {
        title: 'Random Code',
        image: 'https://i.imgur.com/oWKVfbw.png',
        link: siteLink+'SecretCode'
      },
    kenmerkendeAspecten: {
        title: 'Kenmerkende Aspecten',
        image: 'https://i.gyazo.com/9c98afc30a2719c3eaf8334d8626c225.png',
        link: siteLink+'SecretCode'
    },
    collisions1D: {
        title: '1D-collisions',
        image: 'https://i.gyazo.com/a80383962f28ec36938b4cc2bf8b3718.png',
        link: siteLink+'SecretCode'
    },
    Waves: {
        title: 'Waves',
        image: 'https://i.imgur.com/QMRUOgR.png',
        link: siteLink+'Waves',
        created: '2/10/2018',
        latestUpdate: '2/10/2018'
    },
}
$(() => {
    for(projectNum in projects) {
        let project = projects[projectNum]
        $('.ProjectsWrapper').append(`<div class="ProjectBOX" onclick="window.location.href = '${project.link}'"><img src="${project.image}"/><span>${project.title}</span></div>`)
    }
})
