class Ball {
  constructor(x, y, mass, velocity, color) {
    this.x = x
    this.y = y
    this.mass = mass
    this.velocity = velocity
    this.color = color
  }
  checkBallCollision(target) {
    let ball = [this, target]

    // if hitting
    let dx = this.x - target.x
    let dy = this.y - target.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    if(distance < this.mass+target.mass && target != this) {
      // stop time
      /*clearInterval(IntervalDRAW)
      clearInterval(IntervalPROCESS)*/
 
      // calculate stuff
      let NormalVector = [ball[1].x - ball[0].x, ball[1].y - ball[0].y]
      let UnitNormalMagnitude = Math.sqrt(Math.pow(NormalVector[0], 2) + Math.pow(NormalVector[1], 2))
      
      let UnitNormal = [NormalVector[0] / UnitNormalMagnitude, NormalVector[1] / UnitNormalMagnitude]
      let UnitTangent = [-UnitNormal[1], UnitNormal[0]]
      
      let Scalar0Normal = UnitNormal[0]*ball[0].velocity.x + UnitNormal[1]*ball[0].velocity.y
      let Scalar0Tangent = UnitTangent[0]*ball[0].velocity.x + UnitTangent[1]*ball[0].velocity.y
      let Scalar1Normal = UnitNormal[0]*ball[1].velocity.x + UnitNormal[1]*ball[1].velocity.y
      let Scalar1Tangent = UnitTangent[0]*ball[1].velocity.x + UnitTangent[1]*ball[1].velocity.y
      
      let Vector0NormalAFTR = (Scalar0Normal * (ball[0].mass - ball[1].mass) + 2 * (ball[1].mass * Scalar1Normal)) / (ball[0].mass + ball[1].mass)
      let Vector1NormalAFTR = (Scalar1Normal * (ball[1].mass - ball[0].mass) + 2 * (ball[0].mass * Scalar0Normal)) / (ball[0].mass + ball[1].mass)
      
      let Vector0Normal = [UnitNormal[0]*Vector0NormalAFTR, UnitNormal[1]*Vector0NormalAFTR]
      let Vector0Tangent = [UnitTangent[0]*Scalar0Tangent, UnitTangent[1]*Scalar0Tangent]
      let Vector1Normal = [UnitNormal[0]*Vector1NormalAFTR, UnitNormal[1]*Vector1NormalAFTR]
      let Vector1Tangent = [UnitTangent[0]*Scalar1Tangent, UnitTangent[1]*Scalar1Tangent]
      
      let FinalVector0 = [Vector0Normal[0]+Vector0Tangent[0], Vector0Normal[1]+Vector0Tangent[1]]
      let FinalVector1 = [Vector1Normal[0]+Vector1Tangent[0], Vector1Normal[1]+Vector1Tangent[1]]
      
      this.velocity.x = FinalVector0[0]
      this.velocity.y = FinalVector0[1]
          
      target.velocity.x = FinalVector1[0]
      target.velocity.y = FinalVector1[1]
    
    }
  }
  checkWallCollision() {
    // check ball collision with walls
    if(this.y-this.mass < 0)             this.velocity.y =  Math.abs(this.velocity.y) // north
    if(this.x+this.mass > canvas.width)  this.velocity.x = -Math.abs(this.velocity.x) // east
    if(this.y+this.mass > canvas.height) this.velocity.y = -Math.abs(this.velocity.y) // south
    if(this.x-this.mass < 0)             this.velocity.x =  Math.abs(this.velocity.x) // west
  }
  move() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }
}