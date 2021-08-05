import './App.css';
import List from './components/Lists'
const Axios = require('axios')
const {useState, useEffect} = require('react')



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
  const handleSubmit =  () => {
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
    }, [setBalance])
  
  return (
    <div className="App">
      <div className = 'hero-group'>
      <h1 className="badge bg-primary" id= 'balance'> BALANCE ACTUAL ${balance} </h1>
     
      <form id= 'form-group' >
     
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <input  type='button' id='btn-1' className={form.type === 'ingreso' ? "btn btn-secondary btn-lg" : "btn btn-success"} onClick={() => setForm({...form, type : 'ingreso'})} value='Ingreso'/>
        <input type='button' id='btn-2'className={form.type === 'egreso' ? "btn btn-secondary btn-lg" :  "btn btn-danger"} onClick={() => setForm({...form, type : 'egreso'}) } value='Egreso'/>
      </div>
      <div className='div-item'>
      
        <input type='text' class="form-control" placeholder='Concepto' name='concept' onChange={(e) => handleChanges(e)}></input>
      </div>
      <div  className='div-item'>
        <input type= 'number' class="form-control" placeholder= 'Monto' name= 'amount' onChange={(e) => handleChanges(e)}></input>
      </div>
      <div className = 'div-item'>

       {form.type === 'egreso' && <select  class="form-select"  name="category" onChange={(e) => handleChanges(e)}>
        <option hidden selected>Seleccione una categoria...</option>
          <option value="Comida">Comida</option>
          <option value="Alquiler/Expensas">Alquiler/Expensas</option>
          <option value="Ocio">Ocio</option>
          <option value="Servicios">Servicios</option>
        </select>
        }
         {form.type === 'ingreso' && <select  class="form-select"  name="category" onChange={(e) => handleChanges(e)}>
        <option hidden selected>Seleccione una categoria...</option>
          <option value="Sueldo">Sueldo</option>
          <option value="Ventas">Ventas</option>
          <option value="Cuenta pendiente">Cuenta pendiente</option>
          <option value="Ganancias(inversiones)">Inversiones</option>
        </select>
        }
      </div>
      <div  className='div-item'>
      {form.concept && form.type && form.amount &&form.category ? <button class="btn btn-success" onClick={handleSubmit}>Aceptar</button> : <button class="btn btn-success" disabled>Complete todos los campos</button> }
      </div>

      </form>
      </div>
      <div className='op-list'>
        <h2 >Registro de operaciones:</h2>
         <List setBalance ={setBalance} />
      </div>
    </div>
  );
}

export default App;
