import './styles.scss'
import logo from './assets/app-logo.svg'
import { useState } from 'react'
import visualizeCirculantGraph from '../logic/graph_visualizer'
import { writeToExcel } from '../logic/excel_generator'

function App() {
  const [numVertex, setNumVertex] = useState()
  const [parameters, setParameters] = useState()
  const [nMax, setNMax] = useState()
  const [kMax, setKMax] = useState()

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

  const createExcel = async () => {
    console.log(nMax, kMax)
    if (!nMax || !kMax) {
      alert('Largest n and k must be filled in')
      return
    }
    if (nMax < 20 || kMax < 2) {
      alert('Largest n and k must be at least 3 and 20')
      return
    }
    await writeToExcel(nMax, kMax)
  }

  return (
    <div className="App">
      <div id='main'>
        <div className='row-logo'>
          <img src={logo} alt='logo' />
          <h2>Circulant Graph</h2>
        </div>
        <div className='input-content'>
          <form onSubmit={handleGenerate}>
            <div className='row-form'>
              <label htmlFor='num-vertex'>Number of Vertex (3-100)</label>
              <div className='input'>
                <input type='number' min={3} max={100} name='num-vertex' placeholder='Exp: 5' onChange={(e) => setNumVertex(e.target.value)} />
              </div>
            </div>
            <div className='row-form'>
              <label htmlFor='parameters'>Parameters</label>
              <div className='input'>
                <input type='text' name='parameters' placeholder='Exp: "1,2", "1,3", "1,2,3", ...' onChange={(e) => setParameters(e.target.value)} />
              </div>
            </div>
            <div className='row-form'>
              <button id='submit' type='submit'>Generate Graph</button>
            </div>
            <div className='separator'></div>
            <p>For generate excel of lmd of Graph Cn(1,k)</p>
            <div className='row-form'>
              <div className='input'>
                <input type={'number'} min={20} max={75} placeholder='Largest order (n)' onChange={(e) => setNMax(parseInt(e.target.value))}/>
              </div>
              <div className='input'>
                <input type={'number'} min={2} max={75} placeholder='Largest k' onChange={(e) => setKMax(parseInt(e.target.value))}/>
              </div>
            </div>
            <button type='button' onClick={createExcel} className='generate-xlsx'>Generate .xlsx File</button>
          </form>
        </div>
      </div>
      <div id='visualizer'>
      </div>
    </div>
  )
}

export default App
