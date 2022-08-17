/** بسم الله الرحمن الرحيم */
import { useQuery } from '@apollo/client'
import authorsQueries from "../queries/authorQueries"
const EditBorn = ()=>{
  const handleEdit = (e)=>{
    e.preventDefault()

  }
  return (

    <form onSubmit={handleEdit}>
      <p> author : <input/ ></p>
      <p> born : <input/ ></p>
      <p><button>Save</button></p>
    </form>

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
      <EditBorn />
    </div>
  )
}
const Authors = (props) => {
  const authors = useQuery(authorsQueries.ALL_AUTHORS)
  if (!props.show) {
    return null
  } 
  return authors.loading ? <div>loadding ...</div>:authors.data&&authors.data.allAuthors?
  <AuthorsList authors={authors.data.allAuthors} />: <div> no data</div>
  
 
}

export default Authors
