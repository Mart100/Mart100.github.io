let siteLink = location.href.replace('index.html', '')
let githubSiteLink = 'https://github.com/Mart100/Mart100.github.io/tree/master/'
let sortBy = 'best'
let test

// date is dd/mm/jjjj
let projects = [
    {
        title: 'Snake Game!',
        image: 'https://i.imgur.com/QVfGknI.png',
        link: siteLink+'Snake',
        code: githubSiteLink+'Snake',
        created: '2/2/2018',
				score: 5,
        description: `
        Just a snake game.
        Interesting part is that its made of 400 div elements.
        While if id make this now. I would just use html canvas
        `
    },
    {
        title: 'Big Bang',
        image: 'https://i.gyazo.com/a891b2b1efc162ab334e245333cb9a35.png',
        link: siteLink+'galaxy',
        code: githubSiteLink+'galaxy',
        created: '.././2018',
				score: 2,
        description: `
        Tried to recreate the start of the universe. 
        Was ment to work way more on this and add planets orbiting etc.
        But quitted fairly quick.
        Still a cool thing to look at
        `
    },
    {
        title: 'PrimeNumbers',
        image: 'https://image.prntscr.com/image/AXbYV1rFTPmBXfnAJLVi1A.png',
        link: siteLink+'PrimeNumbers',
        code: githubSiteLink+'PrimeNumbers',
        created: '../4/2017',
				score: 2,
        description: `
        The very first project i made in javascript. 
        First made it in node.js few days later turned it into a website
        `
    },
    {
        title: 'ChristmasTree',
        image: 'https://i.imgur.com/quathCp.png',
        link: siteLink+'Kerstspel/Kerstboom.html',
        code: 'https://github.com/Mart100/Kerstspel',
        created: '25/11/2017',
				score: 7,
        description: `
        A project i made to show off at my family's yearly christmas dinner.
        Only works on chrome currently.
        You can drag the balls and lights from the side onto the tree.
        And right click them to change some settings.
        `
    },
    {
        title: 'Rocket Particles',
        image: 'https://i.imgur.com/JGyrggs.png',
        link: siteLink+'Particles',
        code: githubSiteLink+'Particles',
        created: '.././2018',
				score: 3,
        description: `
        First real "animation" / "moving thing" i made.
        It used 100 div elements with "position absolute".
        Not the greated choice. But at the time i didnt know of html canvas.
        `
    },
    {
        title: 'TextStatics',
        image: 'https://i.imgur.com/3Gjk3bv.png',
        link: siteLink+'TextStatics',
        code: githubSiteLink+'TextStatics',
        created: '.././2018',
				score: 4,
        description: `
        Simple: Put in a long text. Hit submit. 
        And get some simple statistics about the text
        `
    },
    {
        title: 'Random Code',
        image: 'https://i.imgur.com/oWKVfbw.png',
        link: siteLink+'SecretCode',
        code: githubSiteLink+'SecretCode',
        created: '../5/2017',
				score: 2,
        description: `
        The second website project i made
        `
    },
    {
        title: 'Kenmerkende Aspecten',
        image: 'https://i.gyazo.com/9c98afc30a2719c3eaf8334d8626c225.png',
        link: 'https://geschiedenis.glitch.me/',
        code: 'https://glitch.com/edit/#!/neuralnetpong',
        created: '.././2018',
				score: 2,
        description: `
        A thing we have to learn at school.
        So my sister requested to make a website to learn it easier.
        `
    },
    {
        title: '1D-collisions',
        image: 'https://i.gyazo.com/a80383962f28ec36938b4cc2bf8b3718.png',
        link: siteLink+'1D-collision',
        code: githubSiteLink+'1D-collision',
        created: '25/4/2018',
				score: 5,
        description: `
        I made this so it would be simpler to understand how to make the 2D-collisions.
        Later i added some more settings so it is able to recreate <a href="https://www.youtube.com/watch?v=HEfHFsfGXjs">this video</a>
        `
    },
    {
        title: '2D-collisions',
        image: 'https://i.imgur.com/Dr91qha.png',
        link: siteLink+'2D-collision',
        code: githubSiteLink+'2D-collision',
        created: '25/5/2018',
				score: 10,
        description: `
        Random mass 2D balls. That collide with eachother and the wall.

        `
    },
    {
        title: 'Waves',
        image: 'https://i.imgur.com/QMRUOgR.png',
        link: siteLink+'Waves',
        code: githubSiteLink+'Waves',
        created: '1/10/2018',
				score: 9,
        description: `
        Not much to say about it. Just mess some with the settings in the corner
        `
    },
    {
        title: 'Game Of Life',
        image: 'https://i.imgur.com/jiKiLsT.gif',
        link: siteLink+'GameOfLife',
        code: githubSiteLink+'GameOfLife',
        created: '2/10/2018',
				score: 10,
        description: `
        recreated the popular "Game of life" cellular automaton
        `
    },
    {
        title: 'Analog Clock',
        image: 'https://i.imgur.com/V9xZWsT.png',
        link: siteLink+'analogClock',
        code: githubSiteLink+'analogClock',
        created: '3/10/2018',
				score: 8,
        description: `
        Just an analog clock
        `
    },
    {
        title: 'Path finding algorithm',
        image: 'https://i.imgur.com/MEGLgsu.png',
        link: siteLink+'pathFindingAlgorithm',
        code: githubSiteLink+'pathFindingAlgorithm',
        created: '10/5/2018',
				score: 20,
        description: `
        So this was a really huge project of me.
        When your on the site. You can start by dragging your mouse to draw walls.
        When you done, click on the arrow button in the corner.
        Now you can change some settings. If its the first time trying it out. Just leave this as default.
        Click submit to proceed. First you see a white thing Spreading from the corner. This is to calculate how far a cube gets to the finish.
        It takes some time. But after a while you see the cubes start to head towards the finish.
        So how this works: All of the cubes have a list of instructions example: (left, right, down, down, up, left). And move according those. 
        But after a new generation. There will be mutations of the best 10% (green). Crossovers of the best 10% (blue) And the 10% themselfs (red)
        This way the spiecies in a whole will evolve. How good a cube is calculated by how far it is and how many steps.
        Click the buttons in the corner. To change some settings / get some info
        `
    },
    {
        title: 'Multiplayer game',
        image: 'https://i.imgur.com/Oo4iZhF.png',
        link: 'https://fuct.glitch.me',
        code: 'https://github.com/Mart100/fuct',
        created: '3/3/2018',
				score: 20,
        description: `
        An agar.io like game.
        Made it with a friend long time ago. And later added some more.
        Since its hosted on glitch ( a free hosting site) You will have to wait a while for it to start.
        And if it doesnt load correctly. Just refresh
        `
    },
    {
        title: '3D engine',
        image: 'https://i.imgur.com/3EJ8mUf.png',
        link: siteLink+'3Dengine',
        code: githubSiteLink+'3Dengine',
        created: '15/1/2019',
				score: 10,
        description: `
        A 3D-engine fully custom made uses html canvas.`
    },
    {
        title: '3D multiplayer',
        image: 'https://i.imgur.com/3EJ8mUf.png',
        link: 'https://yeetoos3d.herokuapp.com/',
        code: 'https://github.com/Mart100/Yeetoos3D',
        created: '25/1/2019',
				score: 8,
        description: `
        Copied the 3D-engine. And tried to make it into a 3D multiplayer shooter.
        Still working on this.`
    },
    {
        title: 'Rock Paper Sciccors Cellular Automaton',
        image: 'https://i.imgur.com/7OWUVhM.gif',
        link: siteLink+'RGBcellularAutomaton',
        code: githubSiteLink+'RGBcellularAutomaton',
        created: '26/1/2019',
				score: 10,
        description: `
        So i got the inspiration of this from <a href="https://www.youtube.com/watch?v=M4cV0nCIZoc">This video</a>
        But as you can see i changed it quite a lot. 
        You can click on the color buttons To change your selected color
        and Draw on the canvas or fill.
        click on the "generator" for an interesting mechanic.
        `
    },
    {
        title: 'My Code Snippets',
        image: 'https://i.imgur.com/kyDMRl9.png',
        link: siteLink+'myCodeSnippets',
        code: githubSiteLink+'myCodeSnippets',
        created: '29/1/2019',
				score: 15,
        description: `
        Since i had a lot of instances where im trying to find a little piece of code.
        But have to search all over the internet to find it.
        So i made a little website where i store all my most used code snippets.
        The animations are pretty if i do say so myself
        `
    },
    {
        title: 'Mouse Light Shadows',
        image: 'https://i.imgur.com/WWZDsGc.png',
        link: siteLink+'mouseLight',
        code: githubSiteLink+'mouseLight',
        created: '3/2/2019',
				score: 10,
        description: `
        A small project where your mouse is the light.
        And it draws shadows
        <br>Use " for(let i of objects) i.removeRotation() " In console For removing all rotation of the objects
        <br>Its still a bit buggy, Might fix later. or not
        `
    },
    {
        title: 'PONG multiplayer',
        image: 'https://i.imgur.com/NH6Ny2e.png',
        link: 'https://neuralnetpong.glitch.me/',
        code: 'https://glitch.com/edit/#!/neuralnetpong',
        created: '.././2018',
				score: 10,
        description: `
        PONG singleplayer and multiplayer
        `
    },    
    {
        title: 'This Site!',
        image: 'https://i.imgur.com/nKTfDvT.png',
        link: 'https://github.com/Mart100/Mart100.github.io',
        code: 'https://github.com/Mart100/Mart100.github.io',
        created: '.././9999',
				score: 999,
        description: `
        PONG singleplayer and multiplayer
        `
    }
]


$(() => {
	sortProjects()
	addProjects()

	// on sort by button click
	$('#projectsSplitter .dropdown > button').on('click', () => {
		$('#projectsSplitter #dropdown').toggle()
	})

	// on sort dropdown button click
	$('#projectsSplitter .dropdown-content > button').on('click', (e) => { sortByChange(e)})
})

function sortByChange(e) {

	sortBy = e.target.attributes.id.value

	// hide dropdown
	$('#projectsSplitter #dropdown').toggle()

	// edit text of button
	$('#projectsSplitter .dropdown > button').html(sortBy)

	// refresh projects and sort
	sortProjects()
	$('#projectsWrapper').html('')
	addProjects()


}


function addProjects() {
	// add all projects
	for(projectNum in projects) {
		let project = projects[projectNum]
		let title = project.title
		$('#projectsWrapper').append(`
		<div class="ProjectBOX" id="project-${projectNum}">
			<a href="${project.link}"><img class="thumbnail" src="${project.image}"/></a>
			<div class="bar">
				<span class="title">${project.title}</span>
				<img class="infoButton" src="https://i.imgur.com/4fHs0Qk.png"/>
				${ project.code != undefined ? `<a href="${project.code}"><img class="codeButton" src="https://i.imgur.com/HAzpWfk.png"/></a>` : ''}
			</div>
		</div>`)

		// on info button click
		$(`#project-${projectNum} .infoButton`).on('click', () => {
			let num = projects.indexOf(projects.find((a) => a.title == title))

			$(`#project-${num} .bar`).animate({'height': '100%', 'bottom': '100%'}, 500)
			$(`#project-${num} .bar`).prepend(`<span class="created">Created on: ${project.created}</span>`)
			$(`#project-${num} .bar`).prepend(`<p class="description">${project.description}</p>`)
			
			// animate back when mouse leave
			$(`#project-${num}`).on('mouseleave', () => {
				$(`#project-${num} .bar`).animate({'height': '25px', 'bottom': '25px'}, 1000)
				$(`#project-${num} .created`).fadeOut(1000, () => { $(`#project-${num} .created`).remove() })
				$(`#project-${num} .description`).fadeOut(1000, () => { $(`#project-${num} .description`).remove() })
				$(`#project-${num}`).off('mouseleave')
			})
		})

	}
}

function sortProjects() {
	switch(sortBy) {
		case('newest'):
			projects = projects.sort((a,b) => {
				B = b.created.replace(/\./g, '0').split('/')
				A = a.created.replace(/\./g, '0').split('/')

				let totalB = Number(B[0]) + Number(B[1])*31 + Number(B[2])*12*31
				let totalA = Number(A[0]) + Number(A[1])*31 + Number(A[2])*12*31

				//console.log('========\n', a.title, A, totalA, '\n', b.title, B, totalB)
				return totalB-totalA
					
			})
			break
		case('best'):
			projects = projects.sort((a,b) => {
				B = b.score
				A = a.score
				return B-A
					
			})
			break
	}
}