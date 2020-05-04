// https://tmcw.github.io/literate-raytracer/

class Ray {
	constructor(pos, vel) {
		this.pos = pos
		this.vel = vel.setMagnitude(1)
	}
	getFirstIntersect() {
		let intersects = []
		for(let object of world.objects) {
			if(object.shape == 'ball') { // ball intersections: https://i.imgur.com/F5qBTuB.png https://i.imgur.com/z4uX74F.png
				
				let eye_to_centerBall = object.pos.clone().subtract(this.pos)
				let rayLength = eye_to_centerBall.dotProduct(this.vel)
				let rayClosestToBall = this.pos.clone().plus(this.vel.clone().setMagnitude(rayLength))
				let rayDistanceToBall = rayClosestToBall.clone().subtract(object.pos).getMagnitude()

				if(rayDistanceToBall < object.size) { // hits ball

					// get intersect position.
					let dist1 = rayLength-Math.sqrt(object.size**2 + rayDistanceToBall**2)
					let intersectPos = this.pos.clone().plus(this.vel.clone().setMagnitude(dist1))

					// check light sources
					for(let light of world.lights) {
						
					}

					intersects.push([object, rayLength])
				}
			}
		}
		//console.log(intersects)
		let intersectsOrdered = intersects.sort((a, b) => a[1]-b[1])
		let firstIntersect = intersectsOrdered[0]
		if(firstIntersect) firstIntersect = firstIntersect[0]
		return firstIntersect
	}
}