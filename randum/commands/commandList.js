const commandList = {
  "help": {
		"permissions": "all",
		"category": "general",
		"aliases": ["commands"],
		"description": "Lists all randum commands",
    "source": "-"
	},
	"image": {
		"permissions": "all",
		"aliases": ["img", "pic", "picture"],
		"category": "images",
    "description": "Shows a random image",
    "source": "https://picsum.photos"
	},
	"activity": {
		"permissions": "all",
		"category": "text",
    "description": "A random activity for you to do although you probably won’t",
    "source": "https://www.boredapi.com/"
	},
	"letter": {
		"permissions": "all",
		"category": "text",
    "description": "Gets a random letter (don’t know why you would want that though)",
    "source": "-"
	},
	"number": {
		"permissions": "all",
		"aliases": ["num"],
		"category": "text",
    "description": "Gets you a random number and a fact about it",
    "source": "-"
	},
	"quote": {
		"permissions": "all",
		"category": "text",
    "description": "Gets you a random very deep quote",
    "source": "https://github.com/vinitshahdeo/inspirational-quotes"
	},
	"cat": {
		"permissions": "all",
		"aliases": ["meow"],
		"category": "images",
    "description": "Picture of a cat",
    "source": "https://aws.random.cat"
	},
	"catfact": {
		"permissions": "all",
		"aliases": ["cat_fact"],
		"category": "text",
    "description": "Get facts about cats",
    "source": "https://catfact.ninja"
	},
	"dog": {
		"permissions": "all",
		"aliases": ["woof"],
		"category": "images",
    "description": "Get a picture of a dog",
    "source": "https://random.dog"
	},
	"fox": {
		"permissions": "all",
		"category": "images",
    "description": "Gets you a picture of a fox",
    "source": "-"
	},
	"word": {
		"permissions": "all",
		"category": "text",
    "description": "test",
    "source": "https://github.com/words/an-array-of-english-words"
	},
	"yesorno": {
		"permissions": "all",
		"category": "text",
		"disabled": true,
		"description": "Yes? or... no?",
		"source": "https://yesno.wtf"
	},
	"person": {
		"permissions": "all",
		"category": "other",
    "description": "Information about a made up person.",
    "source": "https://randomuser.me"
	},
	"dadjoke": {
		"permissions": "all",
		"category": "text",
    "description": "Just a random joke but its bad",
    "source": "https://icanhazdadjoke.com"
	},
	"advice": {
		"permissions": "all",
		"category": "other",
    "description": "Just random stuff that probably won’t help you",
    "source": "https://api.adviceslip.com/"
	},
	"fact": {
		"permissions": "all",
		"category": "text",
    "description": "Something most likely not even interesting",
    "source": "https://uselessfacts.jsph.pl"
	},
	"poem": {
		"permissions": "all",
		"category": "text",
    "description": "Gives you, a poem.",
    "source": "https://www.poemist.com"
	},
	"trump": {
		"permissions": "all",
		"category": "text",
    "description": "Something trump would say",
    "source": "https://api.whatdoestrumpthink.com"
	},
	"wiki": {
		"permissions": "all",
		"aliases": ["wikipedia"],
		"category": "links",
    "description": "Get a random wikipedia article.",
    "source": "Wikipedia"
	},
	"website": {
		"permissions": "all",
		"aliases": ["site"],
		"category": "links",
    "description": "The most random websites",
    "source": "https://www.randomweb.site"
	},
	"vote": {
		"permissions": "all",
		"category": "general",
    "description": "Vote for this bot (please do)",
    "source": "-"
	},
	"logo": {
		"permissions": "all",
		"category": "images",
		"disabled": true,
		"description": "Get a randomly colorized image/logo",
    "source": "https://brandmark.io/color-wheel/"
	},
	"waifu": {
		"permissions": "all",
		"category": "images",
    "description": "Gives you a random anime girl",
    "source": "https://mywaifulist.moe"
	},
	"subreddit": {
		"permissions": "all",
		"aliases": ["reddit"],
		"category": "links",
    "description": "A random subreddit this command will give you",
    "source": "https://reddit.com"
	},
	"meme": {
		"permissions": "all",
		"category": "images",
    "description": "A random meme which is hilarious",
    "source": "r/memes"
	},
	"user": {
		"permissions": "all",
		"aliases": ["someone"],
		"category": "other",
    "description": "Outputs a random user from within the server",
    "source": "-"
	},
	"color": {
		"permissions": "all",
		"aliases": ["colour"],
		"category": "other",
    "description": "A random color",
    "source": "-"
	},
	"noise": {
		"permissions": "all",
		"category": "images",
    "description": "picture of noise",
    "source": "-"
	},
	"sequence": {
		"permissions": "all",
		"category": "text",
    "description": "Outputs a random string of characters.",
    "source": "-"
	},
	"perlin": {
		"permissions": "all",
		"category": "images",
    "description": "Picture of perlin noise",
    "source": "-"
	},
	"joke": {
		"permissions": "all",
		"category": "text",
    "description": "A dadjoke but better",
    "source": "https://official-joke-api.appspot.com"
	},
	"google": {
		"permissions": "all",
		"category": "text",
		"disabled": true
	},
	"urban": {
		"permissions": "all",
		"category": "text",
		"disabled": true
	},
	"googleimg": {
		"permissions": "all",
		"aliases": ["google_img"],
		"category": "images",
		"args": ["search query"],
		"description": "Searches google images and outputs a random image depending on your input",
    "source": "https://google.com"
	},
	"language": {
		"permissions": "all",
		"aliases": ["lang"],
		"category": "text",
    "description": "A random language in the world",
    "source": "-"
	},
	"country": {
		"permissions": "all",
		"category": "text",
    "description": "A random country",
    "source": "-"
	},
	"random": {
		"permissions": "all",
		"aliases": ["randum"],
		"category": "other",
    "description": "Outputs a random command from all randum commands",
    "source": "-"
	},
	"catbreed": {
		"permissions": "all",
		"aliases": ["cat_breed"],
		"category": "other",
    "description": "A random cat breed.",
    "source": "https://catfact.ninja"
	},
	"invite": {
		"permissions": "all",
		"category": "general",
    "description": "A link to invite this bot to your own server",
    "source": "-"
	},
	"cocktail": {
		"permissions": "all",
		"category": "text",
    "description": "A random cocktail, with instructions on how to make",
    "source": "https://www.thecocktaildb.com/api/json/v1/1/random.php"
	},
	"disablecommand": {
		"permissions": "ADMINISTRATOR",
		"category": "admin",
		"args": ["command-name"],
		"description": "Disables a command in your server",
    "source": "-"
	},
	"enablecommand": {
		"permissions": "ADMINISTRATOR",
		"category": "admin",
		"args": ["command-name"],
		"description": "Enables a command in your server",
    "source": "-"
	},
	"setprefix": {
		"permissions": "ADMINISTRATOR",
		"category": "admin",
		"args": ["prefix"],
		"description": "Changes the prefix which is used for the bot.",
    "source": "-"
	},
  "eval": {
		"permissions": "",
		"category": "hidden",
    "description": "eval",
    "source": "-"
	}
}