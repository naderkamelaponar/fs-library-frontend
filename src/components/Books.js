/** بسم الله الرحمن الرحيم */
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import booksQueries from '../queries/booksQueries'
const Genres = ({genres,setGenre})=>{
  if (!genres) return <p> no genres ...</p>
  const handleGenre = (e)=>{
    setGenre(e.target.value)
  }
  return (
    <div>
      <h4>genres</h4>
      <button key={0} value='' onClick={handleGenre}>All</button>
      {genres.sort().map((g,i)=>{
         return  g? <button key={i+1} value={g} onClick={handleGenre}>{g}</button>:null
      })}
    </div>
  )
  }
const BooksList = ({books , setGenre})=>{
  let genres =[]
  if(books){
    books.map(b=>{return  genres= genres.concat(b.genres)})
  }
  genres=[...new Set(genres)]
  
  return (
    <div>
      <h2>books {books.length}</h2>
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
      < Genres genres={genres} setGenre = {setGenre} />
    </div>
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
  return books.loading ? <div>loadding ...</div>:books.data&&books.data.allBooks?
  <BooksList books={books.data.allBooks} setGenre={handleSetGenre} />: <div> no data</div>

}


export default Books
