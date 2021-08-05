import '../styles/Filter.css'
const Axios = require('axios')
const {useState, useEffect} = require('react')

export default  function FilterInput({props}) {
  const [type, setType] =  useState("")
  const [filtered, setFiltered] = useState([])
   

function handleSearch (e) {
   setFiltered(props.filter(op => op.category.includes(e)))
 }
  
  return(<div className='filtered-div'>
      <div class="btn-group" >
          <h3>Filtrar:</h3>
     <button type="button" class="btn btn-success" onClick={() => setType('ingreso')}>Ingreso</button>
     <button type="button" class="btn btn-danger" onClick={() => setType('egreso')}>Egreso</button>
      </div>
         {type === 'egreso' && <select  class="form-select"  name="category" onChange={(e) => handleSearch(e.target.value)}>
        <option hidden selected>Seleccione una categoria...</option>
          <option value="Comida">Comida</option>
          <option value="Alquiler/Expensas">Alquiler/Expensas</option>
          <option value="Ocio">Ocio</option>
          <option value="Servicios">Servicios</option>
        </select>
        }
         {type === 'ingreso' && <select  class="form-select"  name="category" onChange={(e) => handleSearch(e.target.value)}>
        <option hidden selected>Seleccione una categoria...</option>
          <option value="Sueldo">Sueldo</option>
          <option value="Ventas">Ventas</option>
          <option value="Cuenta pendiente">Cuenta pendiente</option>
          <option value="Ganancias(inversiones)">Inversiones</option>
        </select>
        }
        <div >
          {filtered.length > 0 ? filtered.map(op => {
              return(<div>
              <p>{op.concept} </p>

              </div>)
          }): null}
        </div>
      </div>)
}