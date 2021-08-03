const Axios = require('axios')
const {useState, useEffect} = require('react')
import axios from 'axios'
import '../styles/Lists.css'
import FilterInput from './FilterInput'



export default function List () {
  const [operations, setOperations] = useState([])
  const [edit, setEdit] = useState({
      id: "",
      amount:"",
      concept: "",
      category: ""
  })
    useEffect( () => {
      return Axios.get('http://localhost:3001/all')
     .then((response) => setOperations(response.data)) 
     .catch(error => alert(error))

     }, [])
     
     const editer = (id, amount, concept, category) => {
      setOperations(operations => operations.map(op => {
        if(op.id === id){
          op.amount = amount
         op.concept = concept
         op.category = category
        }
        return op
      }))
      axios.put('http://localhost:3001/update/post',{
        id, 
        amount,
        concept,
        category
      })
    }
    
    const removeClick = (id ) => {
     setOperations(operations => operations.filter(op => op.id !== id))
     Axios.delete('http://localhost:3001/delete/post',{ data:{id}})
     
    }
  return (
    <div className = 'list-container'>
         <FilterInput operations ={operations} setOperations={setOperations}/>
         <div className='list-div'> 
       <label>INGRESOS</label>
           { operations ? operations.map(operation => {
             if(operation.type === 'ingreso'){
           return (<div>
             <ul>
               <strong>Monto:</strong>{edit.id !== operation.id ? "$" + operation.amount : <input placeholder={operation.amount} name = 'amount'type = 'text' onChange={(e) => setEdit({...edit,[e.target.name]:e.target.value})}></input>}
               <strong>Concepto:</strong>{edit.id !== operation.id ? operation.concept : <input placeholder={operation.concept} name = 'concept'type = 'text' onChange={(e) => setEdit({...edit,[e.target.name]:e.target.value})}></input>}
               <strong>Fecha:</strong>{operation.updatedAt}
               <strong>Categoria:</strong>{edit.id !== operation.id ? operation.category : <select id="category" name="category" onChange={(e) => setEdit({...edit,[e.target.name]:e.target.value})}>
               <option hidden selected>{operation.category} </option>
          <option value="comida">Comida</option>
          <option value="alquiler/expensas">Alquiler(expensas)</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
                 </select>}

               <button onClick={() => removeClick(operation.id)}>X</button>
               {edit.id !== operation.id ? <button onClick={() => setEdit({id:operation.id, amount: operation.amount, concept: operation.concept, category:operation.category})} >E</button> : 
                                <button onClick={() => {
                                editer(operation.id, edit.amount, edit.concept, edit.category)
                                setEdit({id:"", amount: "", concept:"", category:""}
                                  )}}>Aceptar</button>}
               </ul>
               </div>)}
                }) : <p> Cargando...</p> } 
            </div>
            <div className='list-div'> 
            <label>EGRESOS</label>
           { operations ? operations.map(operation => {
             if(operation.type === 'egreso'){
             return (<div>
             <ul>
               <strong>Monto:</strong>{edit.id !== operation.id ? "$" + operation.amount : <input name = 'amount'type = 'text' onChange={(e) => handleEdit(e, operation.id)}></input>}
               <strong>Concepto:</strong>{operation.concept}
               <strong>Fecha:</strong>{operation.createdAt}
               <strong>Categoria:</strong>{operation.category}
               <button onClick={() => removeClick(operation.id, operation.type)}>X</button>
               {edit.id !== operation.id ? <button onClick={() => setEdit({id:operation.id, amount: operation.amount, concept: operation.concept})} >E</button> : 
                                <button onClick={() => {
                                editer(operation.id, edit.amount, edit.concept)
                                setEdit({id:"", amount: "", concept:""}
                                  )}}>Aceptar</button>}
               </ul>
               </div>)}
       }) : <p> Cargando...</p>  } 
       </div>
       
      </div>
  )
}