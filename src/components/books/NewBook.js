/** بسم الله الرحمن الرحيم */
import { useState } from 'react'
import {useMutation } from '@apollo/client'
import booksQueries from '../../queries/booksQueries'
import appHooks from '../../hooks'
const NewBook = (props) => {
  const title= appHooks.useInput('')
  const author = appHooks.useInput('')
  const published = appHooks.useInput('')
  const genre = appHooks.useInput('')
  const [genres, setGenres] = useState([])
  const[msg,setMsg] = useState('')
  /* const [addBook,res] = useMutation(booksQueries.ADD_BOOK,{
    refetchQueries:[{query:booksQueries.ALL_BOOKS,variables:{
      genre:''
    }}]
  }) */
  const [addBook] = useMutation(booksQueries.ADD_BOOK ,{
    onError:(error)=>{
      setMsg(error.graphQLErrors[0].message)
    },
    update:(cache,resault)=>{
      cache.updateQuery({query:booksQueries.ALL_BOOKS,variables:{genre:''}},({allBooks})=>{
        return {allBooks:allBooks.concat(resault.data.addBook)}
      })
    }
  })
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('add book...')
    const res = await addBook({
      variables:{
        title:title.value,
        author:author.value,
        published:Number(published.value),
        genres
      }
    })
     if(res.data){
      setMsg('done')
      title.form.resetValue()
      published.form.resetValue()
      author.form.resetValue()
      genre.form.resetValue()
      setGenres([])
      return
     }

  }

  const addGenre = () => {
    if(genres.includes(genre.value)){
      setMsg(`genre ${genre.value} is added`)
      return
    }
    setGenres(genres.concat(genre.value))
    genre.form.resetValue()
  }

  return (
    <div>
      <h3> add new book </h3>
      {msg && <p> {msg}</p>}
      <form onSubmit={submit}>
        <div>
          title
          <input {...title}/>
        </div>
        <div>
          author
          <input {...author}/>
        </div>
        <div>
          published
          <input {...published}/>
        </div>
        <div>
          <input {...genre}/>
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
