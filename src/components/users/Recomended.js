/** بسم الله الرحمن الرحيم */
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import booksQueries from '../../queries/booksQueries'
import BooksList from '../books/BooksList'
const Recomended = (props) => {
  const [genre,setGenre]= useState('')
  const books = useQuery(booksQueries.ALL_BOOKS,{variables:{
    genre
  }})

  if (!props.show) {
    return null
  }
  const handleSetGenre=(g)=>{
    setGenre(g)
  }
  return books.loading ? <div>loadding ...</div>:books.data&&books.data.allBooks?
  <BooksList books={books.data.allBooks} setGenre={handleSetGenre} />: <div> no data</div>

}
export default Recomended
