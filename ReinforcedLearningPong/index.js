// some variables
let brain = new NeuralNetwork(nj.array([[0,0,0,0,0,0]]), nj.array([0,0]))
let generations = []
let generation = 0
let game = {
  side1: {
    goals: 0,
    y: 0
  }, 
  side2: {
    goals: 0,
    y: 0
  }, 
  ball: {
    pos: {
      x: 0,
      y: 0
    }, 
    velocity: {
      x: 0,
      y: 0
    }
  },
  nextGeneration: 0
}
let settings = {speed: 5, GameVisibility: 'All'}
google.charts.load('current', {packages: ['corechart', 'line']})

$(function() {
  // check for visibility chance

  $('#GameVisibilityRADIOS').on('click', () => {
    learning.GameVisibility = $('#GameVisibilityRADIOS input:checked').parent().text().trim()
  })
  $('#BrainVisibilityRADIOS').on('click', () => {
    learning.BrainVisibility = $('#BrainVisibilityRADIOS input:checked').parent().text().trim()
  })
})
