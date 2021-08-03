const Axios = require('axios')
const {useState, useEffect} = require('react')


export default function FilterInput({setOperations}) {
  const [search, setSearch] = useState("")
  useEffect(() => {
      const handleSearch =() => {
         setOperations(operations => operations.filter(op => {
             if(op.category.includes(search)){
                 return search
             }
         }))
      }
  }, [search])
  return(<div>
      <input type='text' onChange={(e) => setSearch(e.target.value)} ></input>
  </div>)
}