"use strict";

var siteLink = location.href.replace('index.html', '');
var githubSiteLink = 'https://github.com/Mart100/Mart100.github.io/tree/master/';
var projectsShown = 14;
var sortBy = 'best';
var test; // date is dd/mm/jjjj

var projects = [{
  title: 'Snake Game!',
  image: 'https://i.imgur.com/QVfGknI.png',
  link: siteLink + 'Snake',
  code: githubSiteLink + 'Snake',
  created: '2/2/2018',
  score: 5,
  description: "\n\t\t\t\tJust a snake game.\n\t\t\t\tInteresting part is that its made of 400 div elements.\n\t\t\t\tWhile if id make this now. I would just use html canvas\n\t\t\t\t"
}, {
  title: 'Big Bang',
  image: 'https://i.gyazo.com/a891b2b1efc162ab334e245333cb9a35.png',
  link: siteLink + 'galaxy',
  code: githubSiteLink + 'galaxy',
  created: '.././2018',
  score: 2,
  description: "\n\t\t\t\tTried to recreate the start of the universe. \n\t\t\t\tWas ment to work way more on this and add planets orbiting etc.\n\t\t\t\tBut quitted fairly quick.\n\t\t\t\tStill a cool thing to look at\n\t\t\t\t"
}, {
  title: 'PrimeNumbers',
  image: 'https://image.prntscr.com/image/AXbYV1rFTPmBXfnAJLVi1A.png',
  link: siteLink + 'PrimeNumbers',
  code: githubSiteLink + 'PrimeNumbers',
  created: '../4/2017',
  score: 2,
  description: "\n\t\t\t\tThe very first project i made in javascript. \n\t\t\t\tFirst made it in node.js few days later turned it into a website\n\t\t\t\t"
}, {
  title: 'ChristmasTree',
  image: 'https://i.imgur.com/quathCp.png',
  link: siteLink + 'Kerstspel/Kerstboom.html',
  code: 'https://github.com/Mart100/Kerstspel',
  created: '25/11/2017',
  score: 7,
  description: "\n\t\t\t\tA project i made to show off at my family's yearly christmas dinner.\n\t\t\t\tOnly works on chrome currently.\n\t\t\t\tYou can drag the balls and lights from the side onto the tree.\n\t\t\t\tAnd right click them to change some settings.\n\t\t\t\t"
}, {
  title: 'TextStatics',
  image: 'https://i.imgur.com/3Gjk3bv.png',
  link: siteLink + 'TextStatics',
  code: githubSiteLink + 'TextStatics',
  created: '.././2018',
  score: 4,
  description: "\n\t\t\t\tSimple: Put in a long text. Hit submit. \n\t\t\t\tAnd get some simple statistics about the text\n\t\t\t\t"
}, {
  title: 'Random Code',
  image: 'https://i.imgur.com/oWKVfbw.png',
  link: siteLink + 'SecretCode',
  code: githubSiteLink + 'SecretCode',
  created: '../5/2017',
  score: 2,
  description: "\n\t\t\t\tThe second website project i made\n\t\t\t\t"
}, {
  title: 'Kenmerkende Aspecten',
  image: 'https://i.gyazo.com/9c98afc30a2719c3eaf8334d8626c225.png',
  link: 'https://geschiedenis.glitch.me/',
  code: 'https://glitch.com/edit/#!/neuralnetpong',
  created: '.././2018',
  score: 2,
  description: "\n\t\t\t\tA thing we have to learn at school.\n\t\t\t\tSo my sister requested to make a website to learn it easier.\n\t\t\t\t"
}, {
  title: '1D-collisions',
  image: 'https://i.gyazo.com/a80383962f28ec36938b4cc2bf8b3718.png',
  link: siteLink + '1D-collision',
  code: githubSiteLink + '1D-collision',
  created: '25/4/2018',
  score: 5,
  description: "\n\t\t\t\tI made this so it would be simpler to understand how to make the 2D-collisions.\n\t\t\t\tLater i added some more settings so it is able to recreate <a href=\"https://www.youtube.com/watch?v=HEfHFsfGXjs\">this video</a>\n\t\t\t\t"
}, {
  title: '2D-collisions',
  image: 'https://i.imgur.com/Dr91qha.png',
  link: siteLink + '2D-collision',
  code: githubSiteLink + '2D-collision',
  created: '25/5/2018',
  score: 10,
  description: "\n\t\t\t\tRandom mass 2D balls. That collide with eachother and the wall.\n\n\t\t\t\t"
}, {
  title: 'Waves',
  image: 'https://i.imgur.com/QMRUOgR.png',
  link: siteLink + 'Waves',
  code: githubSiteLink + 'Waves',
  created: '1/10/2018',
  score: 9,
  description: "\n\t\t\t\tNot much to say about it. Just mess some with the settings in the corner\n\t\t\t\t"
}, {
  title: 'Game Of Life',
  image: 'https://i.imgur.com/jiKiLsT.gif',
  link: siteLink + 'GameOfLife',
  code: githubSiteLink + 'GameOfLife',
  created: '2/10/2018',
  score: 10,
  description: "\n\t\t\t\trecreated the popular \"Game of life\" cellular automaton\n\t\t\t\t"
}, {
  title: 'Analog Clock',
  image: 'https://i.imgur.com/V9xZWsT.png',
  link: siteLink + 'analogClock',
  code: githubSiteLink + 'analogClock',
  created: '3/10/2018',
  score: 8,
  description: "\n\t\t\t\tJust an analog clock\n\t\t\t\t"
}, {
  title: 'Path finding algorithm',
  image: 'https://i.imgur.com/MEGLgsu.png',
  link: siteLink + 'pathFindingAlgorithm',
  code: githubSiteLink + 'pathFindingAlgorithm',
  created: '10/5/2018',
  score: 15,
  description: "\n\t\t\t\tThis was a huge project of me.\n\t\t\t\tWhen you're on the site, you can start by dragging your mouse to draw walls.\n\t\t\t\tWhen you're done, click on the arrow button in the bottom-right corner.\n\t\t\t\tAfter a while, you see the cubes start to head towards the finish.\n\t\t\t\tAll of the cubes have a list of instructions, for example: (left, right, down, down, up, left). And they move according those instructions. \n\t\t\t\tBut after a new generation, there will be mutations of the best 10% of the previous generation (green), crossovers of the best 10% (blue) and the 10% themselves (red).\n\t\t\t\tThis way, the spiecies in a whole will evolve. \n\t\t\t\tHow good a cube is, is calculated by how nearby it is from the finish and how many steps has it taken.\n\t\t\t\t"
}, {
  title: 'Multiplayer game',
  image: 'https://i.imgur.com/M5DH0yq.png',
  link: 'https://fuct.herokuapp.com/',
  created: '3/3/2018',
  score: 16,
  description: "\n\t\t\t\tAn agar.io-like game. <br>\n\t\t\t\tMy friend and I started this game a long time ago and later on we decided to continue. <br>\n\t\t\t\tSince it's hosted on a free hosting site, you will have to wait a while for it to start. <br>\n\t\t\t\t<br>\n\t\t\t\tThe goal is to defend your \"core\" with walls and turrets, which you can buy with coins. <br>\n\t\t\t\tIt is a multiplayer-game, so you have to destroy the \"core\" of other players. <br>\n\t\t\t\t<br>\n\t\t\t\tControls: <br>\n\t\t\t\t- WASD to move around <br>\n\t\t\t\t- ENTER to chat <br>\n\t\t\t\t- B to toggle build mode <br>\n\t\t\t\t- F to open shop <br>\n\t\t\t\t"
}, {
  title: '3D engine',
  image: 'https://i.imgur.com/3EJ8mUf.png',
  link: siteLink + '3Dengine',
  code: githubSiteLink + '3Dengine',
  created: '15/1/2019',
  score: 15,
  description: "\n\t\t\t\tA 3D-engine fully custom made uses html canvas."
}, {
  title: '3D multiplayer',
  image: 'https://i.imgur.com/3EJ8mUf.png',
  link: 'https://yeetoos3d.herokuapp.com/',
  code: 'https://github.com/Mart100/Yeetoos3D',
  created: '25/1/2019',
  score: 8,
  description: "\n\t\t\t\tCopied the 3D-engine. And tried to make it into a 3D multiplayer shooter.\n\t\t\t\tStill working on this."
}, {
  title: 'Rock Paper Sciccors Cellular Automaton',
  image: 'https://i.imgur.com/7OWUVhM.gif',
  link: siteLink + 'RGBcellularAutomaton',
  code: githubSiteLink + 'RGBcellularAutomaton',
  created: '26/1/2019',
  score: 10,
  description: "\n\t\t\t\tSo i got the inspiration of this from <a href=\"https://www.youtube.com/watch?v=M4cV0nCIZoc\">This video</a>\n\t\t\t\tBut as you can see i changed it quite a lot. \n\t\t\t\tYou can click on the color buttons To change your selected color\n\t\t\t\tand Draw on the canvas or fill.\n\t\t\t\tclick on the \"generator\" for an interesting mechanic.\n\t\t\t\t"
}, {
  title: 'My Code Snippets',
  image: 'https://i.imgur.com/kyDMRl9.png',
  link: siteLink + 'myCodeSnippets',
  code: githubSiteLink + 'myCodeSnippets',
  created: '29/1/2019',
  score: 10,
  description: "\n\t\t\t\tSince, it happens to me many times that when I'm trying to find a little piece of code,\n\t\t\t\tbut have to search all over the internet to find it.\n\t\t\t\tSo, I made a page where I store all my most-used-code-snippets.\n\t\t\t\tThe animations are \uD83D\uDC4C if I do say so myself.\n\t\t\t\t"
}, {
  title: 'Mouse Light Shadows',
  image: 'https://i.imgur.com/WWZDsGc.png',
  link: siteLink + 'mouseLight',
  code: githubSiteLink + 'mouseLight',
  created: '3/2/2019',
  score: 10,
  description: "\n\t\t\t\tA small project where your mouse is the light.\n\t\t\t\tAnd it draws shadows\n\t\t\t\t<br>Use \" for(let i of objects) i.removeRotation() \" In console For removing all rotation of the objects\n\t\t\t\t<br>Its still a bit buggy, Might fix later. or not\n\t\t\t\t"
}, {
  title: 'PONG multiplayer',
  image: 'https://i.imgur.com/NH6Ny2e.png',
  link: 'https://neuralnetpong.glitch.me/',
  code: 'https://glitch.com/edit/#!/neuralnetpong',
  created: '.././2018',
  score: 10,
  description: "\n\t\t\t\tPONG singleplayer and multiplayer\n\t\t\t\t"
}, {
  title: 'home Isolation',
  image: 'https://i.imgur.com/1f8JBv9.png',
  link: siteLink + 'homeisolation',
  code: githubSiteLink + 'homeisolation',
  created: '8/2/2019',
  score: 10,
  description: "\n\t\t\tHome Isolation Simulation\n\t\t\t"
}, {
  title: 'Terrain Generation',
  image: 'https://i.imgur.com/ptZ03rB.png',
  link: siteLink + 'terrainGeneration',
  code: githubSiteLink + 'terrainGeneration',
  created: '4/3/2019',
  score: 15,
  description: "\n\t\t\ta random terrain generator.<br>\n\t\t\tThat makes use of multiple noise layers onto eachother\n\t\t\t"
}, {
  title: 'Particles',
  image: 'https://i.imgur.com/X2krS2O.png',
  link: siteLink + 'Particles',
  code: githubSiteLink + 'Particles',
  created: '10/3/2019',
  score: 15,
  description: "\n\t\t\tAll sorts of particles.\n\t\t\t"
}, {
  title: 'Chatty',
  image: 'https://i.imgur.com/KttOXSN.png',
  link: 'https://chatty1.herokuapp.com/',
  created: '23/3/2019',
  score: 15,
  description: "\n\t\t\tA simple chatApp made with socket.io and firebase\n\t\t\t"
}, {
  title: 'Toorney',
  image: 'https://i.imgur.com/oUKLIXv.png',
  link: siteLink + 'toorney',
  created: '7/6/2019',
  score: 16.5,
  description: "\n\t\t\tA discord bot and site using challonge for easy tournament hosting.\n\t\t\t"
}, {
  title: 'QuizByte',
  image: 'https://i.imgur.com/8lFdph4.png',
  link: 'http://quizbyte.co',
  created: '7/7/2019',
  score: 8,
  description: "\n\t\t\tA site where everyone can create and play quizzes\n\t\t\t"
}, {
  title: 'MouseStrat',
  image: 'https://i.imgur.com/fY9ZPs1.png',
  link: 'https://mousestrat.herokuapp.com/',
  created: '13/7/2019',
  score: 14,
  description: "\n\t\t\t\tMouseStrat is an online 2D strategy game. \n\t\t\t\tWith a plottwist... You can't see any of your opponents buildings. Only with the use of an ability.\n\t\t\t\tThe goal of the game is to find where your opponent is hiding and destroy your opponents core.\n\t\t\t\tTo achieve this you can use buildings and abilities. Altough these do cost energy.\n\t\t\t\tAn important part of the game is that the opponent will be able to see your mouse.\n\t\t\t\tKnowing your opponent is able to see the position of your mouse, You are able to use this to lead your opponent to fake paths.\n\t\t\t\tAlso make sure to manage your electricity, You can spend electricity on Power Towers to increase your electricity income. \n\t\t\t\tBut if you spend too much time focussing on this, Your opponent might have already found your core\n\t\t\t\tWill you be able to find and destroy your opponent before your opponent finds you?\n\t\t\t"
}, {
  title: 'EvolutionSimulator',
  image: 'https://i.imgur.com/5gPDWwt.png',
  link: siteLink + 'evolutionSim',
  code: githubSiteLink + 'evolutionSim',
  created: '24/4/2019',
  score: 13,
  description: "\n\t\t\t\tTrying to make a simulation using cells that reproduce eat food and move.\n\t\t\t\tSlight chance of mutation. And new crossover cells between 2 parents\n\t\t\t"
}, {
  title: 'Cufix',
  image: 'https://i.imgur.com/lq2okCi.png',
  link: 'https://cufix.herokuapp.com',
  created: '25/7/2019',
  score: 13,
  description: "\n\t\t\t\tYet another game. With simple rules\n\t\t\t\tYou win when you reach the side of your opponent.\n\t\t\t\tYou can capture cells when you click on them\n\t\t\t\tBut you can only capture a cell when you have more neighbors that are claimed by you then the opponent has of that cell.\n\t\t\t"
}, {
  title: 'brainTrain',
  image: 'https://i.imgur.com/WGtAnWc.png',
  link: siteLink + 'brainTrain',
  code: 'https://github.com/Mart100/brainTrain',
  created: '14/7/2019',
  score: 8,
  description: "\n\t\t\t\tSimple project with my dad. Where you have to remember numbers. \n\t\t\t"
}, {
  title: 'Dext',
  image: 'https://i.imgur.com/VUbnjov.png',
  link: siteLink + 'Dext',
  code: githubSiteLink + 'Dext',
  created: '11/8/2019',
  score: 12,
  description: "\n\t\t\t\tAn own programming language that compiles back to javascript\n\t\t\t\tThe programming language called Dext ( dutch text). Is basically fully text, so no symbols\n\t\t\t\tAnd in dutch. And that is about it\n\t\t\t"
}, {
  title: 'Mindmap tool',
  image: 'https://i.imgur.com/b6JhQHV.jpg',
  link: siteLink + 'MindMap',
  code: githubSiteLink + 'MindMap',
  created: '13/8/2019',
  score: 15,
  description: "\n\t\t\t\tA tool to make mind maps!\n\t\t\t"
}, {
  title: 'Type Speed',
  image: 'https://i.imgur.com/KKTNlnh.png',
  link: siteLink + 'typeSpeed',
  code: githubSiteLink + 'typeSpeed',
  created: '31/8/2019',
  score: 12,
  description: "\n\t\t\t\tA tool to test your typing speed!\n\t\t\t"
}, {
  title: 'Moosic',
  image: 'https://i.imgur.com/F4kbBJz.png',
  link: siteLink + 'Moosic',
  code: 'https://github.com/Mart100/Moosic',
  created: '7/9/2019',
  score: 16.2,
  description: "\n\t\t\t\tA music player which uses youtube.\n\t\t\t"
}, {
  title: 'StickyParticles',
  image: 'https://i.imgur.com/Z9uLRW9.png',
  link: siteLink + 'StickyParticles',
  code: githubSiteLink + 'StickyParticles',
  created: '4/10/2019',
  score: 14,
  description: "\n\t\t\t\tSimple particles with gravity\n\t\t\t"
}, {
  title: 'Blonk',
  image: 'https://i.imgur.com/a7vX7bb.png',
  link: 'http://zrn.xyz',
  created: '20/11/2019',
  score: 16,
  description: "\n\t\t\t\tA 2D topdown multiplayer shooter\n\t\t\t"
}, {
  title: 'Dualistic',
  image: 'https://i.imgur.com/CgK2g64.png',
  link: siteLink + 'dualistic',
  created: '2/11/2018',
  score: 14,
  description: "\n\t\t\t\tA game ment for Game off 2018. But never finished\n\t\t\t"
}, {
  title: 'Platformer',
  image: 'https://i.imgur.com/bpbHSPs.png',
  link: siteLink + 'Platformer',
  created: '17/1/2018',
  score: 5,
  description: "\n\t\t\t\tSome platformer I never finished\n\t\t\t"
}, {
  title: 'Aimbot using screencapture',
  image: 'https://i.imgur.com/aS1X5bU.png',
  link: 'https://github.com/Mart100/ZombsRoyaleAimbot2',
  code: 'https://github.com/Mart100/ZombsRoyaleAimbot2',
  created: '6/6/2019',
  score: 10,
  description: "\n\t\t\t\tAn aimbot for a game named ZombsRoyale.\n\t\t\t\tIt doesn't actually work good\n\t\t\t"
}, {
  title: '3D terrain',
  image: 'https://i.imgur.com/TFbs0Xt.png',
  link: siteLink + '3DterrainNoise',
  code: githubSiteLink + '3DterrainNoise',
  created: '6/6/2019',
  score: 10,
  description: "\n\t\t\t\tSome random terrain noise height. With fully custom made 3D engine\n\t\t\t"
}, {
  title: 'Trashcan Projects',
  image: 'https://i.imgur.com/KAvEc2C.png',
  link: siteLink + 'trashcan',
  created: '0/0/0000',
  code: githubSiteLink + 'trashcan',
  score: 0,
  description: "\n\t\t\t\tAll other projects I've made that don't deserve a place here\n\t\t\t"
}, {
  title: 'TSCPY-1',
  image: 'https://i.imgur.com/5FlTFLd.png',
  link: siteLink + 'TSCPY/1',
  created: '15/2/2020',
  code: githubSiteLink + 'TSCPY/1',
  score: 15,
  description: "\n\t\t\t\tTSCPY-1 is a \"simulation\" of an infinite world with rooms and connectons living a daily life.\n\t\t\t"
}, {
  title: 'TSCPY-2',
  image: 'https://i.imgur.com/u4aKXiY.png',
  link: siteLink + 'TSCPY/2',
  code: githubSiteLink + 'TSCPY/2',
  created: '18/2/2020',
  score: 13,
  description: "\n\t\t\tTSCPY-2 is an own cellular automaton that I created with specific rules.\n\t\t\t"
}, {
  title: 'Virus spread',
  image: 'https://i.imgur.com/BSIRuni.png',
  link: siteLink + 'spreadingVirus',
  code: githubSiteLink + 'spreadingVirus',
  created: '6/3/2020',
  score: 14,
  description: "\n\t\t\tTrying to simulate a virus\n\t\t\t"
}, {
  title: 'Dungeoons',
  image: 'https://i.imgur.com/lDkCjum.png',
  link: siteLink + 'dungeoons',
  code: githubSiteLink + 'dungeoons',
  created: '10/4/2020',
  score: 16.1,
  description: "\n\t\t\tSurvive in an infinite random generated dungeons game!\n\t\t\t"
}, {
  title: 'HFF maps',
  image: 'https://i.imgur.com/qkwaBzx.png',
  link: siteLink + 'hffmaps',
  created: '10/4/2019',
  score: 16,
  description: "\n\t\t\tSurvive in an infinite random generated dungeons game!\n\t\t\t"
}, {
  title: 'Pixelart',
  image: 'https://i.imgur.com/nXTOOOf.png',
  link: siteLink + 'pixelart',
  created: '19/4/2020',
  score: 10,
  description: "\n\t\t\tAll pixelart that I've made\n\t\t\t"
}, {
  title: 'MinehutSkriptUploader',
  image: 'https://i.imgur.com/z1Fz3eJ.png',
  link: 'https://www.npmjs.com/package/minehutskriptuploader',
  code: 'https://github.com/Mart100/minehutSkriptUploader',
  created: '21/1/2020',
  score: 10.5,
  description: "\n\t\t\tA application that watches local files. And when saved pushes those files to the minehut servers\n\t\t\t"
}, {
  title: 'Explora',
  image: 'https://i.imgur.com/gbouk4O.png',
  link: 'https://github.com/Mart100/Explora',
  code: 'https://github.com/Mart100/Explora',
  created: '10/5/2019',
  score: 10.1,
  description: "\n\t\t\tAn attempt to make windows explorer using electron\n\t\t\t"
}, {
  title: 'Minecraft Servers',
  image: 'https://i.imgur.com/jW1FeCw.png',
  link: siteLink + 'mcservers',
  created: '10/3/2020',
  score: 15.1,
  description: "\n\t\t\tAn attempt to make windows explorer using electron\n\t\t\t"
}, {
  title: 'Distats',
  image: 'https://i.imgur.com/TEEPhdh.png',
  link: 'https://github.com/Mart100/discordMessagesStats',
  code: 'https://github.com/Mart100/discordMessagesStats',
  created: '21/1/2020',
  score: 14.05,
  description: "\n\t\t\tAn application that extracts statistics from a discord server and makes handy graphs\n\t\t\t"
}, {
  title: 'MonitorSim',
  image: 'https://i.imgur.com/JUObzyx.png',
  link: siteLink + 'monitorSimu',
  code: githubSiteLink + 'monitorSimu',
  created: '2/5/2020',
  score: 13,
  description: "\n\t\t\tIt simulates how a monitor works. And has a grid system with each cell being 3x3. with one row for red, green and blue.\n\t\t\t"
}, {
  title: 'Raytracer',
  image: 'https://i.imgur.com/k4Gs3Bi.png',
  link: siteLink + 'raytracing',
  code: githubSiteLink + 'raytracing',
  created: '8/5/2020',
  score: 14,
  description: "\n\t\t\tIt uses raytracing so cast a view of a 3D scene\n\t\t\t"
}, {
  title: 'HRinfo',
  image: 'https://i.imgur.com/xnILjFI.png',
  link: siteLink + 'HRinfo',
  code: githubSiteLink + 'HRinfo',
  created: '15/5/2019',
  score: 16,
  description: "\n\t\t\tThis was an information and community site + discord bot for an upcomming game named Helmet Royale.\n\t\t\t"
}, {
  title: 'Market Simu',
  image: 'https://i.imgur.com/HkpnkFe.png',
  link: siteLink + 'marketSimu',
  code: githubSiteLink + 'marketSimu',
  created: '27/6/2020',
  score: 13,
  description: "\n\t\t\tA program that simulates an open market making products.\n\t\t\t"
}];
$(function () {
  sortProjects();
  addProjects(); // on sort by button click

  $('#projectsSplitter .dropdown > button').on('click', function () {
    $('#projectsSplitter #dropdown').toggle();
  }); // on sort dropdown button click

  $('#projectsSplitter .dropdown-content > button').on('click', function (e) {
    sortByChange(e);
  }); // on resize. Resize projectBoxes

  $(window).on('resize', function () {
    $(".projectBOX").css('height', $(".projectBOX").width());
  });
});

function sortByChange(e) {
  sortBy = e.target.attributes.id.value; // hide dropdown

  $('#projectsSplitter #dropdown').toggle(); // edit text of button

  $('#projectsSplitter .dropdown > button').html(sortBy); // refresh projects and sort

  sortProjects();
  $('#projectsWrapper').html('');
  addProjects();
}

function addProjects() {
  // limit projects shown
  var splicedProjects = JSON.parse(JSON.stringify(projects)).slice(0, projectsShown);

  if (projectsShown < projects.length) {
    splicedProjects.push({
      title: 'Click to see more projects',
      image: 'https://i.imgur.com/5vFFuv1.jpg'
    });
  } // add all projects 


  var _loop = function _loop() {
    var project = splicedProjects[projectNum];
    var title = project.title;
    $('#projectsWrapper').append("\n\t\t<div class=\"ProjectBOX\" id=\"project-".concat(projectNum, "\">\n\t\t\t<a href=\"").concat(project.link, "\"><img class=\"thumbnail\" src=\"").concat(project.image, "\" alt=\"preview of ").concat(project.title, "\"/></a>\n\t\t\t<div class=\"bar\">\n\t\t\t\t<span class=\"title\">").concat(project.title, "</span>\n\t\t\t\t").concat(project.description != undefined ? "<img class=\"infoButton\" src=\"https://i.imgur.com/4fHs0Qk.png\"/>" : '', "\n\t\t\t\t").concat(project.code != undefined ? "<a href=\"".concat(project.code, "\"><img class=\"codeButton\" src=\"https://i.imgur.com/HAzpWfk.png\"/></a>") : '', "\n\t\t\t</div>\n\t\t</div>"));
    $("#project-".concat(projectNum, " > a")).on('click', function (event) {
      event.preventDefault();
      if (!project.link) return;

      if (!project.link.includes('martve.me')) {
        var num = splicedProjects.indexOf(splicedProjects.find(function (a) {
          return a.title == title;
        }));
        $("#project-".concat(num, " .thumbnail")).attr('src', 'https://i.imgur.com/dwb4jC1.gif');
        $("#project-".concat(num, " .title")).html('Loading...');
      }

      setTimeout(function () {
        location.href = project.link;
      }, 100);
      return false;
    });
    $("#project-".concat(projectNum)).css('height', $("#project-".concat(projectNum)).width());

    if (project.title == 'Click to see more projects') {
      $("#project-".concat(projectNum, " a")).attr('href', 'See_More_Projects');
      $("#project-".concat(projectNum)).on('click', function (event) {
        event.preventDefault();
        projectsShown += 10;
        var scroll = $('#body')[0].scrollTop;
        console.log(scroll);
        $('#projectsWrapper').html('');
        addProjects();
        $('#body')[0].scrollTop = scroll;
      });
    } // on info button click


    $("#project-".concat(projectNum, " .infoButton")).on('click', function () {
      var num = splicedProjects.indexOf(splicedProjects.find(function (a) {
        return a.title == title;
      }));
      $("#project-".concat(num, " .bar")).animate({
        'height': '100%',
        'bottom': '100%'
      }, 500);
      $("#project-".concat(num, " .bar")).prepend("<span class=\"created\">Created on: ".concat(project.created, "</span>"));
      $("#project-".concat(num, " .bar")).prepend("<p class=\"description\">".concat(project.description, "</p>")); // animate back when mouse leave

      $("#project-".concat(num)).on('mouseleave', function () {
        $("#project-".concat(num, " .bar")).animate({
          'height': '25px',
          'bottom': '25px'
        }, 1000);
        $("#project-".concat(num, " .created")).fadeOut(1000, function () {
          $("#project-".concat(num, " .created")).remove();
        });
        $("#project-".concat(num, " .description")).fadeOut(1000, function () {
          $("#project-".concat(num, " .description")).remove();
        });
        $("#project-".concat(num)).off('mouseleave');
      });
    });
  };

  for (projectNum in splicedProjects) {
    _loop();
  }
}

function sortProjects() {
  switch (sortBy) {
    case 'newest':
      projects = projects.sort(function (a, b) {
        B = b.created.replace(/\./g, '0').split('/');
        A = a.created.replace(/\./g, '0').split('/');
        var totalB = Number(B[0]) + Number(B[1]) * 31 + Number(B[2]) * 12 * 31;
        var totalA = Number(A[0]) + Number(A[1]) * 31 + Number(A[2]) * 12 * 31; //console.log('========\n', a.title, A, totalA, '\n', b.title, B, totalB)

        return totalB - totalA;
      });
      break;

    case 'best':
      projects = projects.sort(function (a, b) {
        B = b.score;
        A = a.score;
        return B - A;
      });
      break;
  }
}