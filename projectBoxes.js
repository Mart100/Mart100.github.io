let siteLink = location.href
// date is dd/mm/jjjj
let projects = {
    snakeGame: {
        title: 'Snake Game!',
        image: 'https://i.imgur.com/QVfGknI.png',
        link: siteLink+'Snake',
        created: '.././2018',
        latestUpdate: '.././2018'
      },
      galaxy: {
        title: 'Big Bang',
        image: 'https://i.gyazo.com/a891b2b1efc162ab334e245333cb9a35.png',
        link: siteLink+'galaxy',
        created: '.././2018',
        latestUpdate: '.././2018'
      },
      /*primeNumbers: {
        title: 'PrimeNumbers',
        image: 'https://image.prntscr.com/image/AXbYV1rFTPmBXfnAJLVi1A.png',
        link: siteLink+'Priemnumbers'
      },*/
      rocket: {
        title: 'Rocket Particles',
        image: 'https://i.imgur.com/JGyrggs.png',
        link: siteLink+'Particles',
        created: '.././2018',
        latestUpdate: '.././2018'
      },
      textStatics: {
        title: 'TextStatics',
        image: 'https://i.imgur.com/3Gjk3bv.png',
        link: siteLink+'TextStatics',
        created: '.././2018',
        latestUpdate: '.././2018'
      },
      randomCode: {
        title: 'Random Code',
        image: 'https://i.imgur.com/oWKVfbw.png',
        link: siteLink+'SecretCode',
        created: '.././2018',
        latestUpdate: '.././2018'
      },
    kenmerkendeAspecten: {
        title: 'Kenmerkende Aspecten',
        image: 'https://i.gyazo.com/9c98afc30a2719c3eaf8334d8626c225.png',
        link: siteLink+'SecretCode',
        created: '.././2018',
        latestUpdate: '.././2018'
    },
    collisions1D: {
        title: '1D-collisions',
        image: 'https://i.gyazo.com/a80383962f28ec36938b4cc2bf8b3718.png',
        link: siteLink+'1D-collision',
        created: '25/4/2018',
        latestUpdate: '25/4/2018'
    },
    collisions2D: {
        title: '2D-collisions',
        image: 'https://i.imgur.com/Dr91qha.png',
        link: siteLink+'2D-collision',
        created: '25/5/2018',
        latestUpdate: '25/5/2018'
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
