import './styles.scss'
import logo from './assets/app-logo.svg'
import { useState } from 'react'
import visualizeCirculantGraph from '../logic/graph_visualizer'

function App() {
  const [numVertex, setNumVertex] = useState()
  const [parameters, setParameters] = useState()

  const handleGenerate = (e) => {
    e.preventDefault()
    if (!numVertex || !parameters) {
      alert('Please fill in all fields')
      return
    }
    if (numVertex < 3) {
      alert('Number of vertices must be at least 3')
      return
    }
    const parseParams = parameters.split(',').map((param) => parseInt(param))
    console.log('Generating graph with parameters:', `${numVertex}, ${parseParams}`)
    visualizeCirculantGraph(numVertex, parseParams)
  }

  return (
    <div className="App">
      <div id='main'>
        <div className='row-logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='input-content'>
          <form onSubmit={handleGenerate}>
            <div className='row-form'>
              <label htmlFor='num-vertex'>Number of Vertex (3-20)</label>
              <div className='input'>
                <input type='number' min={3} max={20} name='num-vertex' placeholder='Exp: 5' onChange={(e) => setNumVertex(e.target.value)} />
              </div>
            </div>
            <div className='row-form'>
              <label htmlFor='parameters'>Parameters</label>
              <div className='input'>
                <input type='text' name='parameters' placeholder='Exp: (1,2), (1,3), (1,2,3), ...' onChange={(e) => setParameters(e.target.value)} />
              </div>
            </div>
            <div className='row-form'>
              <button id='submit' type='submit'>Generate</button>
            </div>
          </form>
        </div>
      </div>
      <div id='visualizer'>
      </div>
    </div>
  )
}

export default App
