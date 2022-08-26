/** بسم الله الرحمن الرحيم */
const BooksList = ({books})=>{
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
                     {  return <li key={i}>{g}</li>  }  )
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