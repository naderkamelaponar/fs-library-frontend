/** بسم الله الرحمن الرحيم */
import { useQuery } from '@apollo/client'
import booksQueries from '../queries/booksQueries'
const BooksList = ({books})=>{
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
const Books = (props) => {
  const books = useQuery(booksQueries.ALL_BOOKS)
  if (!props.show) {
    return null
  }
  return books.loading ? <div>loadding ...</div>:books.data&&books.data.allBooks?
  <BooksList books={books.data.allBooks} />: <div> no data</div>

}

export default Books
