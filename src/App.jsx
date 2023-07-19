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
  const [nkChanged, setNkChanged] = useState(false)
  const [paramWarning, setParamWarning] = useState(false)

  const handleGenerate = (e) => {
    e.preventDefault()
    if (!nkChanged) return
    if (!numVertex || !parameters) {
      alert('Please fill in all fields')
      return
    }
    if (numVertex < 3) {
      alert('Number of vertices must be at least 3')
      return
    }
    const parseParams = parameters.split(',').map((param) => parseInt(param))
    visualizeCirculantGraph(numVertex, parseParams)
    setNkChanged(false)
  }

  const createExcel = async () => {
    if (!nMax || !kMax) {
      alert('Largest n and k must be filled in')
      return
    }
    if (nMax < 20 || kMax < 2) {
      alert('Largest n and k must be at least 3 and 20')
      return
    }
    if (nMax > 75 || kMax > 75) {
      alert('Largest n and k must be at most 75')
      return
    }
    await writeToExcel(nMax, kMax).then(() => {
      // alert('Excel file generated successfully')
      location.reload()
    })
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
                <input type='number' min={3} max={100} name='num-vertex' placeholder='Exp: 5' onChange={(e) => {setNumVertex(e.target.value); setNkChanged(true)}} />
              </div>
            </div>
            <div className='row-form'>
              <label htmlFor='parameters'>Parameters</label>
              <div className='input'>
                <input type='text' name='parameters' placeholder='Exp: "1,2", "1,3", "1,2,3", ...' onChange={(e) => {setParameters(e.target.value); setNkChanged(true)}} />
              </div>
            </div>
            <div className='row-form'>
              <button id='submit' type='submit'>Generate Graph</button>
              <a className='paper' target='_blank' href='https://drive.google.com/file/d/1o48-jM5HV9asbcrCahiL_KlCNWhduGY_/view?usp=sharing'>Paper (.pdf)</a>
            </div>
            <div className='separator'></div>
            <div className='row-form'>
            <p>For generate excel of lmd of Graph Cn(1,k)</p>
            <a href='/result_example.png' target={'_blank'}>Preview</a>
            </div>
            <div className='row-form'>
              <div className='input'>
                <input type={'number'} min={20} max={75} placeholder='Largest order (n)' onChange={(e) => {setNMax(parseInt(e.target.value)); setParamWarning(parseInt(e.target.value) > 50 && kMax > 50)}}/>
              </div>
              <div className='input'>
                <input type={'number'} min={2} max={75} placeholder='Largest k' onChange={(e) => {setKMax(parseInt(e.target.value)); setParamWarning(parseInt(e.target.value) > 50 && nMax > 50)}}/>
              </div>
            </div>
            {paramWarning ? <p className='warning'>Warning: Komputasi mungkin akan berat untuk nilai diatas 50</p> : <></>}
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
