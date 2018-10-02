function tick() {
    // create new point positions
    let newPoints = []

    switch(mode) {
        case('realisticWaves'): {

            for(let i=0; i<settings.totalPoints; i++) {
                // if the first point
                if(points[i-1] == undefined) newPoints[i] = ((points[i]*4)+points[i])/5
                // else ( every other point)
                else newPoints[i] = ((points[i-1]*4)+points[i])/5
            }
            break
        }
        case('noise'): {
            for(let i=0; i<settings.totalPoints; i++) {
                // calculate if other direction
                if(Math.random() > 1-1/settings.strength) {
                    if(points[i] > settings.totalWater/settings.totalPoints) extraData.points[i].trend = false
                    if(points[i] < settings.totalWater/settings.totalPoints) extraData.points[i].trend = true
                }
                // new points
                if(extraData.points[i].trend) newPoints[i] = ++points[i]
                else newPoints[i] = --points[i]
            }
            break
        }




    }
    // apply new point positions
    points = newPoints
}
