const Axios = require('axios')
const {useState, useEffect} = require('react')
import './App.css';
import FilterInput from './components/FilterInput';
import List from './components/Lists'


function App() {
  const [balance, setBalance] = useState(0)
  const [form, setForm] = useState({
    concept: '',
    amount: 0,
    type : '',
    category: ''
  })

  const handleChanges = (e) =>{
    setForm({...form, [e.target.name]:e.target.value})
  }
  const handleSubmit = () => {
    form.amount = parseInt(form.amount)
   Axios.post('http://localhost:3001/create/post', {
      concept: form.concept,
      amount: form.amount,
      type: form.type,
      category: form.category
   })

  }
  useEffect(() => {
    Axios.get('http://localhost:3001/')
    .then((response) => {
      setBalance(response.data)
    })
    .catch(error => alert(error))
    }, [])
  
  return (
    <div className="App">
      <h1> BALANCE ACTUAL ${balance} </h1>
     
      <form className= 'form-group'>
      <div className='div-item'>
      <label>Tipo</label>
        <input  type='button'  onClick={() => setForm({...form, type : 'ingreso'})} value='+'/>
        <input type='button' onClick={() => setForm({...form, type : 'egreso'}) } value='-'/>
      </div>
      <div className='div-item'>
       <label>Concepto   </label>
        <input type='text' placeholder='concepto' name='concept' onChange={(e) => handleChanges(e)}></input>
      </div>
      <div  className='div-item'>
       <label>Monto   </label>
        <input type= 'number' placeholder= 'monto' name= 'amount' onChange={(e) => handleChanges(e)}></input>
      </div>
      <div className = 'div-item'>
       <label>Categoria</label>
        <select id="category" name="category" onChange={(e) => handleChanges(e)}>
        <option hidden selected>Selecciona una opción</option>
          <option value="comida">Comida</option>
          <option value="alquiler/expensas">Alquiler(expensas)</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div  className='div-item'>
      <button onClick={handleSubmit}>Enviar</button>
      </div>
      </form>
      <div className='op-list'>
        <h2>Registro de operaciones:</h2>
         <List />
      </div>
    </div>
  );
}

export default App;
