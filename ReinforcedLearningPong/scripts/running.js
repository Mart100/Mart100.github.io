// when page loads
$(() => {
  game.ball.velocity = randomBallVelocity()
  start()
})


function start() {
  let running = setInterval(() => {
    let side1 = game.side1, side2 = game.side2
    let ball = game.ball





    // if speed change. stop process and start again with new setInterval
    if(settings.speed != $('#OPTIONspeedSLIDER').val()) {
      clearInterval(running)
      settings.speed = Number($('#OPTIONspeedSLIDER').val())
      start()
    }

    /*=========COLLISIONS=========*/
    // ball hits peddel
    // left side
    if(ball.pos.x-5<=-672 && ball.pos.y-5<=side1.y+37.5 && ball.pos.y-5>=side1.y-37.5) {
      let offset = (ball.pos.y-5) - (side1.y)
      ball.velocity.y = offset / 37.5
      ball.velocity.x = Math.abs(ball.velocity.x)
      ball.hit = true
      side1.hits++
    }
    //right side
    if(ball.pos.x+5>=672 && ball.pos.y+5<=side2.y+37.5 && ball.pos.y-5>=side2.y-37.5) {
      let offset = (ball.pos.y-5) - (side2.y)
      ball.velocity.y = offset / 37.5
      ball.velocity.x = -Math.abs(ball.velocity.x)
      ball.hit = true
      side2.hits++
    }
    // ball hits top or bottom wall
    if(ball.pos.y-5<=-450) ball.velocity.y = Math.abs(ball.velocity.y)
    if(ball.pos.y+5>=450) ball.velocity.y = -Math.abs(ball.velocity.y)
    // ball hits goal
    if(ball.pos.x-5<=-700) {
      if(ball.hit) side2.goals++
      ball.pos.x = 0; ball.pos.y = 0
      ball.velocity = randomBallVelocity()
      ball.hit = false
    }
    if(ball.pos.x+5>=700) {
      if(ball.hit) side1.goals++
      ball.pos.x = 0; ball.pos.y = 0
      ball.velocity = randomBallVelocity()
      ball.hit = false
    }

    /*=========MOVING=========*/
    let move1 = brain.run(info_to_brain_input()).tolist()[0]
    let move2 = simpleBot()
    // move paddles
    if(move1[0] >= 0.5 && side1.y > -450+37.5) side1.y -= settings.speed
    if(move1[1] >= 0.5 && side1.y < 450-37.5) side1.y += settings.speed

    if(move2[0] >= 0.5 && side2.y > -450+37.5) side2.y -= settings.speed
    if(move2[1] >= 0.5 && side2.y < 450-37.5) side2.y += settings.speed

    // move ball
    ball.pos.x += ball.velocity.x*20
    ball.pos.y += ball.velocity.y*20

    // nextGeneration when
    game.nextGeneration++
    if(game.nextGeneration > 1000) nextGeneration()



  }, (101-settings.speed))
}


function drawChart() {
  let data = new google.visualization.DataTable()
  data.addColumn('number', 'X')
  data.addColumn('number', 'Goals')
  data.addColumn('number', 'Hits')
  // create rows
  let addRowsData = []
  for(num in generations) {
    let generation = generations[num]
    addRowsData.push([Number(num), Number(generation.goals), Number(generation.hits)])
  }
  addRowsData[0] = [0,0,0]
  data.addRows(addRowsData)

  var options = {
    hAxis: {
      title: 'Generations'
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('PROGRESSchart'));
  chart.draw(data, options);
}

function nextGeneration() {
  generation++
  game.nextGeneration = 0
  $('#STATICSgeneration').html('Generation: '+generation)
  game.ball.velocity = randomUnitVector()
  generations.push({goals: game.side1.goals, hits: game.side1.hits})
  drawChart()
}