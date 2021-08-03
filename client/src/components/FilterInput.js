const Axios = require('axios')
const {useState, useEffect} = require('react')


export default function FilterInput({setOperations, props}) {
  const [search, setSearch] = useState({props})
  

  function handleSearch (e) {
      console.log(search)
    //  setOperations(search)
      /* e !== "" && setOperations(operations => operations.filter(op => {
             if(op.category.includes(e)){
                 return op
             } 
         }))*/
      }
  
  return(<div>
      <select id="category" name="category" onChange={(e) => handleSearch(e.target.value)}>
               <option hidden selected>Filtrar por categoria </option>
          <option value=""></option>
          <option value="comida">Comida</option>
          <option value="alquiler/expensas">Alquiler(expensas)</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
                 </select>
  </div>)
}