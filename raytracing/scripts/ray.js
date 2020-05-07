// https://tmcw.github.io/literate-raytracer/

class Ray {
	constructor(pos, vel) {
		this.pos = pos
		this.vel = vel.setMagnitude(1)
	}
	getColor() {
		let intersect = this.getFirstIntersect()

		if(!intersect) return [0,0,0,0]

		let obj = intersect.object
		let objPos = intersect.object.pos.clone()
		let lightLevel = 10
		// check light sources
		for(let lightObj of world.lights) {
			let objectMidToIntersectPos = intersect.object.pos.clone().subtract(intersect.intersectPos)
			let rayToLightPos = intersect.intersectPos.clone() //.subtract(objectMidToIntersectPos.clone().setMagnitude(50))
			let rayToLightVec = rayToLightPos.clone().subtract(lightObj.pos).multiply(-1).setMagnitude(1)
			
			
			let lightToObjVec = lightObj.pos.clone().subtract(objPos)
			let lightToObjVecDist = lightToObjVec.getMagnitude()
			let lightToIntersectVec = lightObj.pos.clone().subtract(intersect.intersectPos)
			let lightToIntersectVecDist = lightToIntersectVec.getMagnitude()
			let lightClosenessRelative = (lightToObjVecDist*0.995-lightToIntersectVecDist) / (obj.size/2)

			let rayToLight = new Ray(rayToLightPos, rayToLightVec)
			let rayToLightIntersect = rayToLight.getFirstIntersect()
			if(!rayToLightIntersect) continue
			let addedLight = lightObj.light*lightClosenessRelative
			if(addedLight < 0) continue
			if(rayToLightIntersect.object == lightObj) lightLevel += addedLight
		}

		let objectColor = intersect.object.color

		if(intersect.object.light) lightLevel = 100

		let finalColor = []
		finalColor[0] = objectColor[0]*(lightLevel/100)
		finalColor[1] = objectColor[1]*(lightLevel/100)
		finalColor[2] = objectColor[2]*(lightLevel/100)

		return finalColor
	}
	getFirstIntersect() {
		let intersects = []
		for(let object of world.objects) {
			if(object.shape == 'ball') { // ball intersections: https://i.imgur.com/F5qBTuB.png https://i.imgur.com/z4uX74F.png
				let eye_to_centerBall = object.pos.clone().subtract(this.pos)
				let rayLength = eye_to_centerBall.dotProduct(this.vel)
				let rayClosestToBall = this.pos.clone().plus(this.vel.clone().setMagnitude(rayLength))
				let rayDistanceToBall = rayClosestToBall.clone().subtract(object.pos).getMagnitude()
				if(rayDistanceToBall < object.size/2 && rayLength > 0) {
					let dist1 = rayLength-Math.sqrt((object.size/2)**2 - rayDistanceToBall**2)
					let intersectPos = this.pos.clone().plus(this.vel.clone().setMagnitude(dist1))
					intersects.push([object, rayLength, intersectPos])
				}
			}
		}
		let intersectsOrdered = intersects.sort((a, b) => a[1]-b[1])
		if(!intersectsOrdered[0]) return
		let firstIntersect = {
			object: intersectsOrdered[0][0],
			rayLength: intersectsOrdered[0][1],
			intersectPos:  intersectsOrdered[0][2]
		}
		return firstIntersect
	}
}