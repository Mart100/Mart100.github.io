class Cube {
	constructor(pos1, pos2, settings) {

		this.corners = [
			new Vector(pos1.x, pos1.y, pos1.z),
			new Vector(pos2.x, pos1.y, pos1.z),
			new Vector(pos2.x, pos2.y, pos1.z),
			new Vector(pos1.x, pos2.y, pos1.z),
			new Vector(pos2.x, pos1.y, pos2.z),
			new Vector(pos2.x, pos2.y, pos2.z),
			new Vector(pos1.x, pos2.y, pos2.z),
			new Vector(pos1.x, pos1.y, pos2.z)
		]
	
		// Generate the faces
		this.faces = [
			[this.corners[0], this.corners[1], this.corners[2], this.corners[3]],
			[this.corners[3], this.corners[2], this.corners[5], this.corners[6]],
			[this.corners[4], this.corners[5], this.corners[6], this.corners[7]],
			[this.corners[7], this.corners[4], this.corners[1], this.corners[0]],
			[this.corners[7], this.corners[0], this.corners[3], this.corners[6]],
			[this.corners[1], this.corners[4], this.corners[5], this.corners[2]]
		]
		return new Object3D(this.faces, this.corners, settings)

	}
}



class Line {
	constructor(start, end, settings) {

		this.corners = [
			new Vector(start.x, start.y, start.z ),
			new Vector(end.x,   end.y,   end.z   ),
		]

		// Generate the faces
		this.faces = [
			[this.corners[0], this.corners[1]],
		]
		return new Object3D(this.faces, this.corners, settings)

	}
}
class Plane {
	constructor(start, end, settings) {

		this.corners = [
			new Vector(start.x, start.y, start.z ),
			new Vector(end.x,   start.y, end.z ),
			new Vector(end.x,   end.y,   end.z ),
			new Vector(start.x, end.y,   start.z ),
		]

		// Generate the faces
		this.faces = [
			[this.corners[0], this.corners[1], this.corners[2], this.corners[3]],
		]
		return new Object3D(this.faces, this.corners, settings)

	} 
}
class Ball {
	constructor(position, diameter, settings) {
		this.corners = [
			// First square 
			new Vector(position.x - diameter/6, position.y - diameter/6, position.z - diameter/2 ),
			new Vector(position.x + diameter/6, position.y - diameter/6, position.z - diameter/2 ),
			new Vector(position.x + diameter/6, position.y + diameter/6, position.z - diameter/2 ),
			new Vector(position.x - diameter/6, position.y + diameter/6, position.z - diameter/2 ),
			// Middle 1
			new Vector(position.x - diameter/6, position.y - diameter/2, position.z - diameter/6 ),
			new Vector(position.x + diameter/6, position.y - diameter/2, position.z - diameter/6 ),
			new Vector(position.x + diameter/2, position.y - diameter/6, position.z - diameter/6 ),
			new Vector(position.x + diameter/2, position.y + diameter/6, position.z - diameter/6 ),
			new Vector(position.x + diameter/6, position.y + diameter/2, position.z - diameter/6 ),
			new Vector(position.x - diameter/6, position.y + diameter/2, position.z - diameter/6 ),
			new Vector(position.x - diameter/2, position.y + diameter/6, position.z - diameter/6 ),
			new Vector(position.x - diameter/2, position.y - diameter/6, position.z - diameter/6 ),
			// Middle 2
			new Vector(position.x - diameter/6, position.y - diameter/2, position.z + diameter/6 ),
			new Vector(position.x + diameter/6, position.y - diameter/2, position.z + diameter/6 ),
			new Vector(position.x + diameter/2, position.y - diameter/6, position.z + diameter/6 ),
			new Vector(position.x + diameter/2, position.y + diameter/6, position.z + diameter/6 ),
			new Vector(position.x + diameter/6, position.y + diameter/2, position.z + diameter/6 ),
			new Vector(position.x - diameter/6, position.y + diameter/2, position.z + diameter/6 ),
			new Vector(position.x - diameter/2, position.y + diameter/6, position.z + diameter/6 ),
			new Vector(position.x - diameter/2, position.y - diameter/6, position.z + diameter/6 ),
			// last square 
			new Vector(position.x - diameter/6, position.y - diameter/6, position.z + diameter/2 ),
			new Vector(position.x + diameter/6, position.y - diameter/6, position.z + diameter/2 ),
			new Vector(position.x + diameter/6, position.y + diameter/6, position.z + diameter/2 ),
			new Vector(position.x - diameter/6, position.y + diameter/6, position.z + diameter/2 ),
		]
	
		// Generate the faces
		this.faces = [
			// layer 1
			[this.corners[0], this.corners[1], this.corners[2], this.corners[3]],
			// layer 2
			[this.corners[4], this.corners[5], this.corners[1], this.corners[0]],
			[this.corners[5], this.corners[6], this.corners[1]],
			[this.corners[1], this.corners[6], this.corners[7], this.corners[2]],
			[this.corners[2], this.corners[7], this.corners[8]],
			[this.corners[3], this.corners[2], this.corners[8], this.corners[9]]
			[this.corners[10], this.corners[3], this.corners[9]],
			[this.corners[11], this.corners[0], this.corners[3], this.corners[10]]
			[this.corners[4], this.corners[0], this.corners[11]],
			// layer 3 middle
			[this.corners[4], this.corners[5], this.corners[12], this.corners[11]],
			[this.corners[5], this.corners[6], this.corners[13], this.corners[12]],
			[this.corners[6], this.corners[7], this.corners[14], this.corners[13]],
			[this.corners[7], this.corners[8], this.corners[15], this.corners[14]],
			[this.corners[8], this.corners[9], this.corners[16], this.corners[15]],
			[this.corners[9], this.corners[10], this.corners[17], this.corners[16]],
			[this.corners[10], this.corners[11], this.corners[18], this.corners[17]],
			[this.corners[11], this.corners[4], this.corners[19], this.corners[12]],
			// layer 4
			[this.corners[12], this.corners[13], this.corners[21], this.corners[20]],
			[this.corners[13], this.corners[14], this.corners[21]],
			[this.corners[21], this.corners[14], this.corners[15], this.corners[22]],
			[this.corners[22], this.corners[15], this.corners[16]],
			[this.corners[23], this.corners[22], this.corners[16], this.corners[17]]
			[this.corners[18], this.corners[23], this.corners[17]],
			[this.corners[19], this.corners[20], this.corners[23], this.corners[18]]
			[this.corners[12], this.corners[20], this.corners[19]],
			// layer 5
			[this.corners[20], this.corners[21], this.corners[22], this.corners[23]],
		]
		return new Object3D(this.faces, this.corners, settings)

	}
}

class Object3D {
	constructor(faces, corners, settings) {
		this.corners = corners
		this.faces = faces

		if(settings == undefined) settings = {}
		this.settings = settings

		// rotation
		this.rot = new Vector()
		if(settings.rot != undefined) this.setRot(settings.rot)

		// add to world
		World.objects.push(this)

	}
	setPos(to) {
		let currentPos = this.getPos()
		for(let i of this.corners) i.minus(currentPos).plus(to)
	}
	movePos(amount) {
		for(let i of this.corners) i.plus(to)
	}
	getPos() {
		// X
		let allX = []
		let sumX = 0
		let averageX = 0
		for(let i of this.corners) allX.push(i.x)
		for(let i=0;i<allX.length;i++) sumX += allX[i]
		averageX = sumX/allX.length

		// Y
		let allY = []
		let sumY = 0
		let averageY = 0
		for(let i of this.corners) allY.push(i.y)
		for(let i=0;i<allY.length;i++) sumY += allY[i]
		averageY = sumY/allY.length

		// Z
		let allZ = []
		let sumZ = 0
		let averageZ = 0
		for(let i of this.corners) allZ.push(i.z)
		for(let i=0;i<allZ.length;i++) sumZ += allZ[i]
		averageZ = sumZ/allZ.length

		return new Vector(averageX, averageY, averageZ)
	}
	setRot(rot) {
		let currentPos = this.getPos()
		for(let i of this.corners) {
			i.minus(currentPos).rotate('all', this.rot.clone().minus(rot)).plus(currentPos)
		}
		this.rot = rot.clone()
	}
}