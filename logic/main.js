import CirculantGraph from "./circulant_graph.js"

function findLmd(n, l) {
  let graph = new CirculantGraph(n, l)
  let adjacencyMatrix = graph.getAdjacencyMatrix()

  // console.log('adjacency matrix:')
  // adjacencyMatrix.forEach(row => console.log(JSON.stringify(row)))
  let distanceMatrix = []
  console.log(`\ndistance matrix C_${n}(${l}):`)
  for (let i = 0; i < n; i++) {
    let distances = graph.findDistance(i)
    distanceMatrix.push(distances)
    console.log(JSON.stringify(distances))
  }

  let chosenLmd = []
  let lmdLength = 1
  let necessarySet = []
  while (chosenLmd.length == 0) {
    necessarySet = graph.getPowersetWithSize(Array.from(Array(n).keys()), lmdLength)
    for (let loc of necessarySet) {
      let metricDistances = distanceMatrix.map(row => loc.map(i => row[i]).join(''))
      let hasSimilarMetricAdjacent = false
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
          return // terminate check for this loc
        } else {
          if (ind + 1 == n) {
            chosenLmd.push(loc)
            return
          }
        }
      })

      if (chosenLmd.length > 0) {
        break
      }
    };
    lmdLength = lmdLength + 1
  }

  console.log('& chosenLmd:', chosenLmd[0])

  return [adjacencyMatrix, chosenLmd[0]]
}

const factorial = (n) => {
  if (n == 0) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}

findLmd(25, [1,12])
export default findLmd