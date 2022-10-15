import Graph from "graphology";
import Sigma from "sigma";
import findLmd from "./main";

function visualizeCirculantGraph(nVertex, param) {
  const [adjacencyMatrix, lmd] = findLmd(nVertex, param);
  // console.log('Adjacent Matrix',graph.getAdjacencyMatrix())

  const container = document.getElementById("visualizer");
  container.innerHTML = "";
  const graph = new Graph();
  // node generator
  for (let i = 0; i < nVertex; i++) {
    const absis = Math.sin((i/nVertex) * 2 * Math.PI)
    const ordinat = Math.cos((i/nVertex) * 2 * Math.PI)
    graph.addNode(`v${i}`, { x: 1*absis, y: 1*ordinat, label: `v${i}`, color: lmd.includes(i) ? "red": "blue", size: 10 });
  }

  for (let j = 0; j < nVertex; j++) {
    for (let k = 0; k < nVertex; k++) {
      if (adjacencyMatrix[j][k] == 1) {
        // graph.addEdge(`e${j}${k}`, `v${j}`, `v${k}`);
        graph.addEdge(`v${j}`, `v${(k)%nVertex}`, { color: "#000", size: 5 });
      }
    }
  }

  new Sigma(graph, container);
  return lmd
}

export default visualizeCirculantGraph;