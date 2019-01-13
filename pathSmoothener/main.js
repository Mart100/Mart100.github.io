let canvas, ctx
let points = []
let morepoints = []


$(function() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  setInterval(() => { frame() }, 1000/60)

  // add points
    $('canvas').on('click', (event) => {
        points.push({x: event.clientX, y: event.clientY})
    })
    $('#morePoints').on('click', (event) => {
        morePoints()
    })
})

function morePoints() {
    let totalLength = totalMagnitude()
    let newpoints = []
    for(let i=0; i<totalLength; i += 20) {
        console.log(i)
        let pointnum = getPointByMagnitude(i)
        if(points[pointnum+1] == undefined) continue
        let point1 = points[pointnum]
        let point2 = points[pointnum+1]
        let vectorBetween = new Vector2(point2.x-point1.x, point2.y-point1.y) 
        let inbetweenPoint = vectorBetween.multiply(i/totalLength % 1)
        inbetweenPoint.add(point1)
        newpoints.push(inbetweenPoint)
    }
    morepoints = JSON.parse(JSON.stringify(newpoints))
}
function getPointByMagnitude(mag) {
    let totalLength = 0
    for(num in points) {
        num = Number(num)
        if(points[num+1] == undefined) continue
        let point1 = points[num]
        let point2 = points[num+1]
        let length = new Vector2(point2.x-point1.x, point2.y-point1.y).magnitude()
        totalLength += length
        if(totalLength > mag) return num
    }
}

function totalMagnitude() {
    let totalLength = 0
    for(num in points) {
        num = Number(num)
        if(points[num+1] == undefined) continue
        let point1 = points[num]
        let point2 = points[num+1]
        let length = new Vector2(point2.x-point1.x, point2.y-point1.y).magnitude()
        totalLength += length
    }
    return totalLength
}
class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    multiply(num) {
        this.x *= num
        this.y *= num
        return this
    }
    add(vec) {
        this.x += vec.x
        this.y += vec.y
        return this
    }
    magnitude() {
        let x = this.x
        let y = this.y
        return Math.sqrt(x*x+y*y)
    }
}