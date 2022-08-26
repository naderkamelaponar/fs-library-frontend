/** بسم الله الرحمن الرحيم */
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import booksQueries from '../../queries/booksQueries'
import BooksList from './BooksList'
import Genres from './Genres'
const Display = ({books,setGenre}) =>{
  let genres =[]
  if(books){
    books.map(b=>{return  genres= genres.concat(b.genres)})
  }
  genres=[...new Set(genres)]
  return (
    <>
    <BooksList books={books}  />
    <Genres genres={genres} setGenre = {setGenre}/>
    </>
  )
}
const Books = (props) => {
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
  return books.loading ? <div>loadding ...</div> 
  : books.data && books.data.allBooks ?
  <Display books={books.data.allBooks} 
   setGenre={handleSetGenre} 
  />
  : <div> no data</div>

}
export default Books
