let siteLink = location.href.replace('index.html', '')
// date is dd/mm/jjjj
let projects = [
    {
        title: 'Snake Game!',
        image: 'https://i.imgur.com/QVfGknI.png',
        link: siteLink+'Snake',
        created: '2/2/2018',
        latestUpdate: '2/2/2018'
    },
    {
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
    {
        title: 'Rocket Particles',
        image: 'https://i.imgur.com/JGyrggs.png',
        link: siteLink+'Particles',
        created: '.././2018',
        latestUpdate: '.././2018'
    },
    {
        title: 'TextStatics',
        image: 'https://i.imgur.com/3Gjk3bv.png',
        link: siteLink+'TextStatics',
        created: '.././2018',
        latestUpdate: '.././2018'
    },
    {
        title: 'Random Code',
        image: 'https://i.imgur.com/oWKVfbw.png',
        link: siteLink+'SecretCode',
        created: '.././2018',
        latestUpdate: '.././2018'
    },
    {
        title: 'Kenmerkende Aspecten',
        image: 'https://i.gyazo.com/9c98afc30a2719c3eaf8334d8626c225.png',
        link: 'https://geschiedenis.glitch.me/',
        created: '.././2018',
        latestUpdate: '.././2018'
    },
    {
        title: '1D-collisions',
        image: 'https://i.gyazo.com/a80383962f28ec36938b4cc2bf8b3718.png',
        link: siteLink+'1D-collision',
        created: '25/4/2018',
        latestUpdate: '25/4/2018'
    },
    {
        title: '2D-collisions',
        image: 'https://i.imgur.com/Dr91qha.png',
        link: siteLink+'2D-collision',
        created: '25/5/2018',
        latestUpdate: '25/5/2018'
    },
    {
        title: 'Waves',
        image: 'https://i.imgur.com/QMRUOgR.png',
        link: siteLink+'Waves',
        created: '1/10/2018',
        latestUpdate: '1/10/2018'
    },
    {
        title: 'Game Of Life',
        image: 'https://i.imgur.com/jiKiLsT.gif',
        link: siteLink+'GameOfLife',
        created: '2/10/2018',
        latestUpdate: '2/10/2018'
    },
    {
        title: 'Analog Clock',
        image: 'https://i.imgur.com/V9xZWsT.png',
        link: siteLink+'analogClock',
        created: '3/10/2018',
        latestUpdate: '3/10/2018'
    },
    {
        title: 'Path finding algorithm',
        image: 'https://i.imgur.com/MEGLgsu.png',
        link: siteLink+'pathFindingAlgorithm',
        created: '10/5/2018',
        latestUpdate: '10/10/2018'
    },
    {
        title: 'Multiplayer game',
        image: 'https://i.imgur.com/Oo4iZhF.png',
        link: 'https://fuct.glitch.me',
        created: '3/3/2018',
        latestUpdate: '3/3/2018'
    },
    {
        title: '3D engine',
        image: 'https://i.imgur.com/3EJ8mUf.png',
        link: siteLink+'3Dengine',
        created: '15/1/2019',
        latestUpdate: '15/1/2019'
    },
    {
        title: '3D multiplayer',
        image: 'https://i.imgur.com/3EJ8mUf.png',
        link: 'https://yeetoos3d.herokuapp.com/',
        created: '25/1/2019',
        latestUpdate: '25/1/2019'
    },
    {
        title: 'Rock Paper Sciccors Cellular Automaton',
        image: 'https://i.imgur.com/7OWUVhM.gif',
        link: siteLink+'RGBcellularAutomaton',
        created: '26/1/2019',
        latestUpdate: '27/1/2019'
    }
]
$(() => {
    projects.sort((a,b) => {
        b = b.latestUpdate.replace(/\./g, '0').split('/')
        a = a.latestUpdate.replace(/\./g, '0').split('/')

        let totalB = Number(b[0]) + Number(b[1])*31 + Number(b[2])*12*31
        let totalA = Number(a[0]) + Number(a[1])*31 + Number(a[2])*12*31

        return totalB-totalA
        
    })
    for(projectNum in projects) {
        let project = projects[projectNum]
        $('.ProjectsWrapper').append(`<div class="ProjectBOX" onclick="window.location.href = '${project.link}'"><img src="${project.image}"/><span>${project.title}</span></div>`)
    }
})