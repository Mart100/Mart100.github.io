let siteLink = location.href.replace('index.html', '')
let githubSiteLink = 'https://github.com/Mart100/Mart100.github.io/tree/master/'
let projectsShown = 14
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
				score: 15,
				description: `
				This was a huge project of me.
				When you're on the site, you can start by dragging your mouse to draw walls.
				When you're done, click on the arrow button in the bottom-right corner.
				After a while, you see the cubes start to head towards the finish.
				All of the cubes have a list of instructions, for example: (left, right, down, down, up, left). And they move according those instructions. 
				But after a new generation, there will be mutations of the best 10% of the previous generation (green), crossovers of the best 10% (blue) and the 10% themselves (red).
				This way, the spiecies in a whole will evolve. 
				How good a cube is, is calculated by how nearby it is from the finish and how many steps has it taken.
				`
		},
		{
				title: 'Multiplayer game',
				image: 'https://i.imgur.com/M5DH0yq.png',
				link: 'https://fuct.herokuapp.com/',
				created: '3/3/2018',
				score: 16,
				description: `
				An agar.io-like game. <br>
				My friend and I started this game a long time ago and later on we decided to continue. <br>
				Since it's hosted on a free hosting site, you will have to wait a while for it to start. <br>
				<br>
				The goal is to defend your "core" with walls and turrets, which you can buy with coins. <br>
				It is a multiplayer-game, so you have to destroy the "core" of other players. <br>
				<br>
				Controls: <br>
				- WASD to move around <br>
				- ENTER to chat <br>
				- B to toggle build mode <br>
				- F to open shop <br>
				`
		},
		{
				title: '3D engine',
				image: 'https://i.imgur.com/3EJ8mUf.png',
				link: siteLink+'3Dengine',
				code: githubSiteLink+'3Dengine',
				created: '15/1/2019',
				score: 15,
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
				score: 10,
				description: `
				Since, it happens to me many times that when I'm trying to find a little piece of code,
				but have to search all over the internet to find it.
				So, I made a page where I store all my most-used-code-snippets.
				The animations are 👌 if I do say so myself.
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
			title: 'home Isolation',
			image: 'https://i.imgur.com/1f8JBv9.png',
			link: siteLink+'homeisolation',
			code: githubSiteLink+'homeisolation',
			created: '8/2/2019',
			score: 10,
			description: `
			Home Isolation Simulation
			`
		},
		{
			title: 'Terrain Generation',
			image: 'https://i.imgur.com/ptZ03rB.png',
			link: siteLink+'terrainGeneration',
			code: githubSiteLink+'terrainGeneration',
			created: '4/3/2019',
			score: 15,
			description: `
			a random terrain generator.<br>
			That makes use of multiple noise layers onto eachother
			`
		},
		{
			title: 'Particles',
			image: 'https://i.imgur.com/X2krS2O.png',
			link: siteLink+'Particles',
			code: githubSiteLink+'Particles',
			created: '10/3/2019',
			score: 15,
			description: `
			All sorts of particles.
			`
		},
		{
			title: 'Chatty',
			image: 'https://i.imgur.com/KttOXSN.png',
			link: 'https://chatty1.herokuapp.com/',
			created: '23/3/2019',
			score: 15,
			description: `
			A simple chatApp made with socket.io and firebase
			`
		},
		{
			title: 'Toorney',
			image: 'https://i.imgur.com/oUKLIXv.png',
			link: 'https://toorney.xyz',
			created: '7/6/2019',
			score: 16.5,
			description: `
			A discord bot and site using challonge for easy tournament hosting.
			`
		},
		{
			title: 'QuizByte',
			image: 'https://i.imgur.com/8lFdph4.png',
			link: 'http://quizbyte.co',
			created: '7/7/2019',
			score: 8,
			description: `
			A site where everyone can create and play quizzes
			`
		},
		{
			title: 'MouseStrat',
			image: 'https://i.imgur.com/fY9ZPs1.png',
			link: 'https://mousestrat.herokuapp.com/',
			created: '13/7/2019',
			score: 14,
			description: `
				MouseStrat is an online 2D strategy game. 
				With a plottwist... You can't see any of your opponents buildings. Only with the use of an ability.
				The goal of the game is to find where your opponent is hiding and destroy your opponents core.
				To achieve this you can use buildings and abilities. Altough these do cost energy.
				An important part of the game is that the opponent will be able to see your mouse.
				Knowing your opponent is able to see the position of your mouse, You are able to use this to lead your opponent to fake paths.
				Also make sure to manage your electricity, You can spend electricity on Power Towers to increase your electricity income. 
				But if you spend too much time focussing on this, Your opponent might have already found your core
				Will you be able to find and destroy your opponent before your opponent finds you?
			`
		},
		{
			title: 'EvolutionSimulator',
			image: 'https://i.imgur.com/5gPDWwt.png',
			link: siteLink+'evolutionSim',
			code: githubSiteLink+'evolutionSim',
			created: '24/4/2019',
			score: 13,
			description: `
				Trying to make a simulation using cells that reproduce eat food and move.
				Slight chance of mutation. And new crossover cells between 2 parents
			`
		},
		{
			title: 'Cufix',
			image: 'https://i.imgur.com/lq2okCi.png',
			link: 'https://cufix.herokuapp.com',
			created: '25/7/2019',
			score: 13,
			description: `
				Yet another game. With simple rules
				You win when you reach the side of your opponent.
				You can capture cells when you click on them
				But you can only capture a cell when you have more neighbors that are claimed by you then the opponent has of that cell.
			`
		},
		{
			title: 'brainTrain',
			image: 'https://i.imgur.com/WGtAnWc.png',
			link: siteLink+'brainTrain',
			code: 'https://github.com/Mart100/brainTrain',
			created: '14/7/2019',
			score: 8,
			description: `
				Simple project with my dad. Where you have to remember numbers. 
			`
		},
		{
			title: 'Dext',
			image: 'https://i.imgur.com/VUbnjov.png',
			link: siteLink+'Dext',
			code: githubSiteLink+'Dext',
			created: '11/8/2019',
			score: 12,
			description: `
				An own programming language that compiles back to javascript
				The programming language called Dext ( dutch text). Is basically fully text, so no symbols
				And in dutch. And that is about it
			`
		},
		{
			title: 'Mindmap tool',
			image: 'https://i.imgur.com/b6JhQHV.jpg',
			link: siteLink+'MindMap',
			code: githubSiteLink+'MindMap',
			created: '13/8/2019',
			score: 15,
			description: `
				A tool to make mind maps!
			`
		},
		{
			title: 'Type Speed',
			image: 'https://i.imgur.com/KKTNlnh.png',
			link: siteLink+'typeSpeed',
			code: githubSiteLink+'typeSpeed',
			created: '31/8/2019',
			score: 12,
			description: `
				A tool to test your typing speed!
			`
		},
		{
			title: 'Moosic',
			image: 'https://i.imgur.com/F4kbBJz.png',
			link: siteLink+'Moosic',
			code: 'https://github.com/Mart100/Moosic',
			created: '7/9/2019',
			score: 16.2,
			description: `
				A music player which uses youtube.
			`
		},
		{
			title: 'StickyParticles',
			image: 'https://i.imgur.com/Z9uLRW9.png',
			link: siteLink+'StickyParticles',
			code: githubSiteLink+'StickyParticles',
			created: '4/10/2019',
			score: 14,
			description: `
				Simple particles with gravity
			`
		},
		{
			title: 'Blonk',
			image: 'https://i.imgur.com/a7vX7bb.png',
			link: 'http://zrn.xyz',
			created: '20/11/2019',
			score: 16,
			description: `
				A 2D topdown multiplayer shooter
			`
		},
		{
			title: 'Dualistic',
			image: 'https://i.imgur.com/CgK2g64.png',
			link: siteLink+'dualistic',
			created: '2/11/2018',
			score: 14,
			description: `
				A game ment for Game off 2018. But never finished
			`
		},
		{
			title: 'Platformer',
			image: 'https://i.imgur.com/bpbHSPs.png',
			link: siteLink+'Platformer',
			created: '17/1/2018',
			score: 5,
			description: `
				Some platformer I never finished
			`
		},
		{
			title: 'Aimbot using screencapture',
			image: 'https://i.imgur.com/aS1X5bU.png',
			link: 'https://github.com/Mart100/ZombsRoyaleAimbot2',
			code: 'https://github.com/Mart100/ZombsRoyaleAimbot2',
			created: '6/6/2019',
			score: 10,
			description: `
				An aimbot for a game named ZombsRoyale.
				It doesn't actually work good
			`
		},
		{
			title: '3D terrain',
			image: 'https://i.imgur.com/TFbs0Xt.png',
			link: siteLink+'3DterrainNoise',
			code: githubSiteLink+'3DterrainNoise',
			created: '6/6/2019',
			score: 10,
			description: `
				Some random terrain noise height. With fully custom made 3D engine
			`
		},
		{
			title: 'Trashcan Projects',
			image: 'https://i.imgur.com/KAvEc2C.png',
			link: siteLink+'trashcan',
			created: '0/0/0000',
			code: githubSiteLink+'trashcan',
			score: 0,
			description: `
				All other projects I've made that don't deserve a place here
			`
		},
		{
			title: 'TSCPY-1',
			image: 'https://i.imgur.com/5FlTFLd.png',
			link: siteLink+'TSCPY/1',
			created: '15/2/2020',
			code: githubSiteLink+'TSCPY/1',
			score: 15,
			description: `
				TSCPY-1 is a "simulation" of an infinite world with rooms and connectons living a daily life.
			`
		},
		{
			title: 'TSCPY-2',
			image: 'https://i.imgur.com/u4aKXiY.png',
			link: siteLink+'TSCPY/2',
			code: githubSiteLink+'TSCPY/2',
			created: '18/2/2020',
			score: 13,
			description: `
			TSCPY-2 is an own cellular automaton that I created with specific rules.
			`
		},
		{
			title: 'Virus spread',
			image: 'https://i.imgur.com/BSIRuni.png',
			link: siteLink+'spreadingVirus',
			code: githubSiteLink+'spreadingVirus',
			created: '6/3/2020',
			score: 14,
			description: `
			Trying to simulate a virus
			`
		},
		{
			title: 'Dungeoons',
			image: 'https://i.imgur.com/lDkCjum.png',
			link: siteLink+'dungeoons',
			code: githubSiteLink+'dungeoons',
			created: '10/4/2020',
			score: 16.1,
			description: `
			Survive in an infinite random generated dungeons game!
			`
		},
		{
			title: 'HFF maps',
			image: 'https://i.imgur.com/qkwaBzx.png',
			link: siteLink+'hffmaps',
			created: '10/4/2019',
			score: 16,
			description: `
			Survive in an infinite random generated dungeons game!
			`
		},
		{
			title: 'Pixelart',
			image: 'https://i.imgur.com/nXTOOOf.png',
			link: siteLink+'pixelart',
			created: '19/4/2020',
			score: 10,
			description: `
			All pixelart that I've made
			`
		},
		{
			title: 'MinehutSkriptUploader',
			image: 'https://i.imgur.com/z1Fz3eJ.png',
			link: 'https://www.npmjs.com/package/minehutskriptuploader',
			code: 'https://github.com/Mart100/minehutSkriptUploader',
			created: '21/1/2020',
			score: 10.5,
			description: `
			A application that watches local files. And when saved pushes those files to the minehut servers
			`
		},
		{
			title: 'Explora',
			image: 'https://i.imgur.com/gbouk4O.png',
			link: 'https://github.com/Mart100/Explora',
			code: 'https://github.com/Mart100/Explora',
			created: '10/5/2019',
			score: 10.1,
			description: `
			An attempt to make windows explorer using electron
			`
		},
		{
			title: 'Minecraft Servers',
			image: 'https://i.imgur.com/jW1FeCw.png',
			link: siteLink+'mcservers',
			created: '10/3/2020',
			score: 15.1,
			description: `
			An attempt to make windows explorer using electron
			`
		},
		{
			title: 'Distats',
			image: 'https://i.imgur.com/TEEPhdh.png',
			link: 'https://github.com/Mart100/discordMessagesStats',
			code: 'https://github.com/Mart100/discordMessagesStats',
			created: '21/1/2020',
			score: 14.05,
			description: `
			An application that extracts statistics from a discord server and makes handy graphs
			`
		},
		{
			title: 'MonitorSim',
			image: 'https://i.imgur.com/JUObzyx.png',
			link: siteLink+'monitorSimu',
			code: githubSiteLink+'monitorSimu',
			created: '2/5/2020',
			score: 13,
			description: `
			It simulates how a monitor works. And has a grid system with each cell being 3x3. with one row for red, green and blue.
			`
		},
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

	// on resize. Resize projectBoxes
	$(window).on('resize', () => {
		$(`.projectBOX`).css('height', $(`.projectBOX`).width())
	})
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

	// limit projects shown
	let splicedProjects = JSON.parse(JSON.stringify(projects)).slice(0, projectsShown)
	if(projectsShown < projects.length) {
		splicedProjects.push({
			title: 'Click to see more projects',
			image: 'https://i.imgur.com/5vFFuv1.jpg'
		})
	}


	// add all projects 
	for(projectNum in splicedProjects) {
		let project = splicedProjects[projectNum]
		let title = project.title
		$('#projectsWrapper').append(`
		<div class="ProjectBOX" id="project-${projectNum}">
			<a href="${project.link}"><img class="thumbnail" src="${project.image}"/></a>
			<div class="bar">
				<span class="title">${project.title}</span>
				${ project.description != undefined ? `<img class="infoButton" src="https://i.imgur.com/4fHs0Qk.png"/>` : ''}
				${ project.code != undefined ? `<a href="${project.code}"><img class="codeButton" src="https://i.imgur.com/HAzpWfk.png"/></a>` : ''}
			</div>
		</div>`)
		
		$(`#project-${projectNum} > a`).on('click', (event) => {
			
			event.preventDefault()

			if(!project.link) return
			if(!project.link.includes('martve.me')) {
				let num = splicedProjects.indexOf(splicedProjects.find((a) => a.title == title))
				$(`#project-${num} .thumbnail`).attr('src', 'https://i.imgur.com/dwb4jC1.gif')
				$(`#project-${num} .title`).html('Loading...')
			}

			setTimeout(() => {
				location.href = project.link
			}, 100)
			return false
		})

		$(`#project-${projectNum}`).css('height', $(`#project-${projectNum}`).width())

		if(project.title == 'Click to see more projects') {
			$(`#project-${projectNum} a`).attr('href', 'See_More_Projects')
			$(`#project-${projectNum}`).on('click', (event) => {
				event.preventDefault()
				projectsShown += 10
				let scroll = $('#body')[0].scrollTop
				console.log(scroll)
				$('#projectsWrapper').html('')
				addProjects()
				$('#body')[0].scrollTop = scroll
			})

		}

		// on info button click
		$(`#project-${projectNum} .infoButton`).on('click', () => {
			let num = splicedProjects.indexOf(splicedProjects.find((a) => a.title == title))

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