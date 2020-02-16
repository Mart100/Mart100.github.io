function simpleBot() {
  if(game.ball.y > game.side2.y) return [1, 0]
  if(game.ball.y < game.side2.y) return [0, 1]
  return [0, 0]
}