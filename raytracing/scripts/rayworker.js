importScripts('./vector.js')
let lastConsole = Date.now()
onmessage = (event) => {
	let ray = {}
	ray.pos = new Vector(event.data[0].pos)
	ray.vel = new Vector(event.data[0].vel)
	
	let objects = event.data[1]
	let intersects = []
	if(Date.now()-lastConsole > 10000) {
		console.log(ray, objects)
		lastConsole = Date.now()
	}
	for(let object of objects) {
		object.pos = new Vector(object.pos)
		if(object.shape == 'ball') { // ball intersections: https://i.imgur.com/F5qBTuB.png https://i.imgur.com/z4uX74F.png
			let eye_to_centerBall = object.pos.clone().subtract(ray.pos)
			let rayLength = eye_to_centerBall.dotProduct(ray.vel)
			let rayClosestToBall = ray.pos.clone().plus(ray.vel.clone().setMagnitude(rayLength))
			let rayDistanceToBall = rayClosestToBall.clone().subtract(object.pos).getMagnitude()
			if(rayDistanceToBall < object.size/2 && rayLength > 0) {
				//console.log('yeseseses')
				let dist1 = rayLength-Math.sqrt((object.size/2)**2 - rayDistanceToBall**2)
				let intersectPos = ray.pos.clone().plus(ray.vel.clone().setMagnitude(dist1))
				intersects.push([object, rayLength, intersectPos])
				
			} else {
				//if(Date.now() - lastConsole < 10 && Math.random() > 0.99) console.log(rayDistanceToBall +'<'+ object.size/2 + '&&' + rayLength + '> 0')
			}
		}
	}
	//if(Date.now() - lastConsole < 10) console.log(intersects)
	let intersectsOrdered = intersects.sort((a, b) => a[1]-b[1])
	if(!intersectsOrdered[0]) return postMessage(undefined)
	let firstIntersect = {
		object: intersectsOrdered[0][0],
		rayLength: intersectsOrdered[0][1],
		intersectPos:  intersectsOrdered[0][2]
	}

	//if(Math.random() > 0.9) console.log(firstIntersect)
	postMessage(firstIntersect)
}