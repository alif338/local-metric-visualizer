import CirculantGraph from "./circulant_graph"

function findLmd(n, l) {
  let graph = new CirculantGraph(n, l)
  let adjacencyMatrix = graph.getAdjacencyMatrix()
  let distanceMatrix = []
  // graph.printAdjacencyMatrix()
  for (let i = 0; i < n; i++) {
    distanceMatrix.push(graph.findDistance(i))
  }

  console.log('distance matrix', distanceMatrix)

  let gPowerset = graph.getPowerset()

  // necessarySet digunakan untuk 'menguli' tiap elemen yang dapat menjadi lmd
  let necessarySet = gPowerset.filter(set => 1 < set.length && set.length < n).sort((a, b) => a.length - b.length)
  console.log('power set', gPowerset)
  console.log('necessarySet', necessarySet)

  let chosenLmd = []
  while (chosenLmd.length == 0) {
    for (let loc of necessarySet) {
      // console.log('loc:', loc)
      let metricDistances = distanceMatrix.map(row => loc.map(i => row[i]).join(''))
      let hasSimilarMetricAdjacent = false
      // console.log('metric distances', metricDistances)
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
  }

  // console.log('chosenLmd:', chosenLmd[0])

  return [adjacencyMatrix, chosenLmd[0]]
}

// findLmd(22, [1,2])
export default findLmd