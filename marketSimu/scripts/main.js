let world
let dashboard


$(() => {

	dashboard = new Dashboard()

  world = new World()

  world.createProducts({
		amounts: {
			'main': {
				'main': 10,
				'sub': [10, 30],
			},
			'sub': {
				'sub': 25,
				'base': [1, 10]
			},
			'base': {
				'base': 50,
				'raw': [1, 5]
			},
			'raw': {
				'raw': 10,
			}
		}
	})
	
	world.createCompanies(100)

  world.startProcess()

})
