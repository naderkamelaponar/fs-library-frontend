/** بسم الله الرحمن الرحيم */
import { useQuery ,useMutation} from '@apollo/client'
import { useState } from 'react'
import authorsQueries from '../queries/authorQueries'
const EditBorn = ({authors})=>{
  const [editBorn] = useMutation(authorsQueries.EDIT_BORN,{
    refetchQueries:[{query:authorsQueries.ALL_AUTHORS}]
  })
  const [selectedName,setSelectedName] = useState('')
  const [born,setBorn] = useState('')
  const handleEdit = (e)=>{
    e.preventDefault()
    if(!selectedName) return
    editBorn({
      variables:{
        name:selectedName,born:Number(born)
      }
    }) 
  }
  const handleSelect =(e)=>{
    setSelectedName(e.target.value)
  }
  return (
    <div>
      <h3>Set Birthday</h3>
      <form onSubmit={handleEdit}>
            <p> 
              <select onChange={handleSelect}>
                <option value={''} >choose Name :</option>
                {authors.map(a=>{
                 return <option key={a.id} value={a.name} > {a.name}</option>
                })}
              </select>

            </p>
      <p> born : <input onChange={({target})=>{
        setBorn(target.value)
      }}/ ></p>
      <p><button>update author</button></p>
    </form>

    </div>
  )

}

const AuthorsList = ({authors})=>{
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}
const Authors = (props) => {
  const authors = useQuery(authorsQueries.ALL_AUTHORS)
  if (!props.show) {
    return null
  } 
  return authors.loading ? <div>loadding ...</div>:authors.data&&authors.data.allAuthors?
  <div>
    <AuthorsList authors={authors.data.allAuthors} />
    <EditBorn authors ={authors.data.allAuthors}/>
  </div>
  : <div> no data</div>
  
 
}

export default Authors
