const Axios = require('axios')
const {useState, useEffect} = require('react')
import '../styles/Lists.css'

export default function List () {
  const [operations, setOperations] = useState()
  const [edit, setEdit] = useState({
      enabled: false,
      id: ""
  })
    useEffect( () => {
    return Axios.get('http://localhost:3001/')
     .then((response) => setOperations(response.data)) 
     .catch(error => alert(error))
     }, [])

    const handleEdit = (e, id) => {
      const {value, name} = e.target
      let edited = operations[0].map(op => {
         if( op.id === id ){
          
         }
        })
      console.log(value, name)
    }     
    const removeClick = (id, type) => {
        Axios.delete('http://localhost:3001/delete',{ data:{
          id,
          type
        }
     })
    }
  return (
      <div className = 'list-div'>
       <div className = 'list-container'> <label>INGRESOS</label>
           {operations ? operations[0].map(operation => {
           return (<ul>
               <strong>Monto:</strong>{!edit.enabled ? operation.amount : <input name = 'amount'type = 'text' onChange={(e) => handleEdit(e, operation.id)}></input>}
               <strong>Concepto:</strong>{operation.concept}
               <strong>Fecha:</strong>{operation.createdAt}
               <strong>Categoria:</strong>{operation.category}
               <button onClick={() => removeClick(operation.id, operation.type)}>X</button>
               {!edit.enabled ? <button onClick={() => setEdit({enabled:true, id:operation.id})} >E</button> : 
                                <button onClick={() => setEdit({enabled:false, id:""})}>Aceptar</button>}
               </ul>)
                }) : <p> Cargando...</p>  } </div>
       
       <div> <label>EGRESOS</label>
           {operations ? operations[1].map(operation => {
           return (<ul>
               <strong>Monto:</strong><span>{operation.amount}</span>
               <strong>Concepto:</strong>{operation.concept}
               <strong>Fecha:</strong>{operation.createdAt}
               <strong>Categoria:</strong>{operation.category}
               <button onClick={() => removeClick(operation.id, operation.type)}>X</button>
               {!edit.enabled ? <button onClick={() => setEdit({enabled:true, id:operation.id})} >E</button> : 
                                <button onClick={() => setEdit({enabled:false, id:""})}>Aceptar</button>}
               </ul>)
       }) : <p> Cargando...</p>  } </div>
      </div>
  )
}