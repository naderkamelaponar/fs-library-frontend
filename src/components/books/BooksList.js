/** بسم الله الرحمن الرحيم */
import Genre from "./Genre"
const BooksList = ({books,dontSet})=>{
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.id}{' '}</td>
              <td>{a.title}{' '}</td>
              <td>{a.author.name} {' '}</td>
              <td>{a.published} {' '}</td>
              <td>
                {a.genres.map((g,i)=>
                     {  if(g)return  <Genre key={i} genre={g} dontSet={dontSet}/>
                    return ''  }  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default BooksList