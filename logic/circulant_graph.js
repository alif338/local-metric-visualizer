class CirculantGraph {
  constructor(n, l) {
    this.n = n
    this.l = l
    this.adjacencyMatrix = this.generateAdjacencyMatrix()

    this.generateAdjacencyMatrix = this.generateAdjacencyMatrix.bind(this)
    this.printAdjacencyMatrix = this.printAdjacencyMatrix.bind(this)
    this.getAdjacencyMatrix = this.generateAdjacencyMatrix.bind(this)
    this.getSize = this.getSize.bind(this)
    this.findDistance = this.findDistance.bind(this)
  }

  
  generateAdjacencyMatrix() {
    let n = this.n
    let adjacencyMatrix = zeros([n,n])
    for (let cycle of this.l) {
      for (let i = 0; i < n; i++) {
        let jAfter = (i + cycle) % n
        let jBefore = (i - cycle + 999999999*n) % n
        adjacencyMatrix[i][jAfter] = 1
        adjacencyMatrix[i][jBefore] = 1
      }
    }
    return adjacencyMatrix
  }

  printAdjacencyMatrix() {
    this.adjacencyMatrix.forEach(row => {
      row.forEach(element => {
        process.stdout.write(element + ' ')
      })
      console.log()
    })
  }

  getAdjacencyMatrix() {
    return this.adjacencyMatrix
  }

  getSize() {
    return this.n
  }

  findDistance(source) {
    // Create a list for distances and initialize all distances as infinite
    //  Mark the source node as 0 so that it is extracted first
    let distances = []
    for (let i = 0; i < this.n; i++) {
      distances.push("inf")
    }
    console.log('distances', distances)
    console.log('adjacencyMatrix', this.adjacencyMatrix)
    distances[source] = 0
    // create an empty queue
    let queue = []
    // enqueue source vertex
    queue.push(source)

    while (queue.length > 0) {
      // dequeue a vertex from queue and print it
      let u = queue.shift()
      // Get all adjacent vertices of the dequeued vertex u. If a adjacent has not been visited, then mark it visited and enqueue it
      for (let v = 0; v < this.n; v++) {
        if (this.adjacencyMatrix[u][v] != 0 && distances[v] == "inf") {
          distances[v] = distances[u] + 1
          queue.push(v)
        }
      }
    }

    return distances
  }

  getPowerset() {
    const getAllSubsets = 
      theArray => theArray.reduce(
        (subsets, value) => subsets.concat(
         subsets.map(set => [value,...set])
        ),
        [[]]
      );
    
    let sourceSet = []
    for (let i = 0; i < this.n; i++) {
      sourceSet.push(i)
    }

    return getAllSubsets(sourceSet)
  }
}

function zeros(dimensions) {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
      array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
  }

  return array;
}

export default CirculantGraph