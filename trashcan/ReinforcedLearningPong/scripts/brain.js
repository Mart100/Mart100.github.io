class NeuralNetwork {
  constructor(x, y) {
    this.input = x
    this.weights1 = nj.random([this.input.shape[1], 4])
    this.weights2 = nj.random([4, 2])
    this.y = y
    this.output = nj.zeros(y.shape)
  }

  run(input) {
    this.input = nj.array([input])
    this.feedforward()
    return this.output
  }

  feedforward() {
    this.layer1 = nj.sigmoid(nj.dot(this.input, this.weights1))
    this.output = nj.sigmoid(nj.dot(this.layer1, this.weights2))
  }

  backprop() {
    // application of the chain rule to find derivative of the loss function with respect to weights2 and weights1
    let d_weights2 = nj.dot(this.layer1.T, (2*(this.y - this.output) * sigmoid_derivative(this.output)))
    let d_weights1 = nj.dot(this.input.T,  (nj.dot(2*(this.y - this.output) * sigmoid_derivative(this.output), this.weights2.T) * sigmoid_derivative(this.layer1)))

    // update the weights with the derivative (slope) of the loss function
    this.weights1 += d_weights1
    this.weights2 += d_weights2
  }
}