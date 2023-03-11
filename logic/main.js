import CirculantGraph from "./circulant_graph.js"

function findLmd(n, l) {
  let graph = new CirculantGraph(n, l)
  let adjacencyMatrix = graph.getAdjacencyMatrix()

  let distanceMatrix = []
  // loop for build a distance matrix
  for (let i = 0; i < n; i++) {
    let distances = graph.findDistance(i)
    distanceMatrix.push(distances)
  }

  let chosenLmd = []
  let lmdLength = 1
  let necessarySet = [] // 'necessarySet' used for put up powerset with specific cardinality
  while (chosenLmd.length == 0) {
    // Get all subsets with size 'lmdLength' each
    necessarySet = graph.getPowersetWithSize(Array.from(Array(n).keys()), lmdLength)
    for (let loc of necessarySet) {
      // Count distances of a vertex to another
      let metricDistances = distanceMatrix.map(row => loc.map(i => row[i]).join(''))
      let hasSimilarMetricAdjacent = false

      // loop for determine which pair has similar distances and adjacent
      metricDistances.forEach((val, ind) => {
        for (let j = ind + 1; j < metricDistances.length; j++) {
          if (val == metricDistances[j]) {
            if (adjacencyMatrix[ind][j] == 0) {
              continue
            } else {
              hasSimilarMetricAdjacent = true
              break
            }
          }
        }

        if (hasSimilarMetricAdjacent) {
          return // terminate check for this 'loc'
        } else {
          if (ind + 1 == n) {
            chosenLmd.push(loc)
            return
          }
        }
      })

      if (chosenLmd.length > 0) {
        break // terminate loop if there found a local metric basis
      }
    };
    lmdLength = lmdLength + 1
  }


  return [adjacencyMatrix, chosenLmd[0]]
}

const factorial = (n) => {
  if (n == 0) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}

export default findLmd