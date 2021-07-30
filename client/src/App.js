const Axios = require('axios')
const {useState, useEffect} = require('react')
import './App.css';

function App() {
  const [currVal, setVal] = useState(0)
  const [state, setState] = useState({
    concept: '',
    amount: 0,
    type : '',
    category: ''
  })

  const handleChanges = (e) =>{
    setState({...state, [e.target.name]:e.target.value})
  }
  const handleSubmit = () => {
   Axios.post('http://localhost:3001/api', {
      concept: state.concept,
      mount: state.mount,
      type: state.type,
      category: state.category
   })

  }
  useEffect(() => {
    Axios.get('http://localhost:3001/api')
    .then((response) => {
      setVal(response.data)
    })
   }, [])
  
  return (
    <div className="App">
      <h1> BALANCE ACTUAL ${currVal} </h1>
     
      <form className= 'form-group'>
      <div>
       <label>Concepto   </label>
        <input type='text' placeholder='concepto' name='concept' onChange={(e) => handleChanges(e)}></input>
      </div>
      <div>
       <label>Monto   </label>
        <input type= 'number' placeholder= 'monto' name= 'mount' onChange={(e) => handleChanges(e)}></input>
      </div>
      <div>
       <label>Categoria</label>
        <input type ='text' placeholder='categoria' name= 'category' onChange={(e) => handleChanges(e)}></input>
      </div>
      <label>Tipo</label>
      <div className='btn-group'>
        <input  type='button'  onClick={() => setState({...state, type : 'ingreso'})} value='+'/>
        <input type='button' onClick={() => setState({...state, type : 'egreso'}) } value='-'/>
      </div>
      
      <button onClick={handleSubmit}>Enviar</button>
      </form>
      <div className='op-list'>

      </div>
    </div>
  );
}

export default App;
