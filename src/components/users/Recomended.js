/** بسم الله الرحمن الرحيم */
import { useQuery } from '@apollo/client'
import booksQueries from '../../queries/booksQueries'
import BooksList from '../books/BooksList'
const Recomended = (props) => {
  
  const books = useQuery(booksQueries.ALL_BOOKS,{variables:{
    genre:props.genre
  }})

  if (!props.show) {
    return null
  }

  return books.loading ? <div>loadding ...</div>:books.data&&books.data.allBooks?
  <BooksList books={books.data.allBooks} />: <div> no data</div>

}
export default Recomended
