/** بسم الله الرحمن الرحيم */
import { useState } from 'react'
import {useMutation } from '@apollo/client'
import booksQueries from '../queries/booksQueries'
const errMsg =  (res)=>{
  const err = res['error']? res['error']:null
  let msg = err? Object.keys(err).filter((a)=>{
   if(a==='message')return err[a]
   return ''
 }):null

 msg= msg? err[msg] :String(res).replace("Error: ").split(":")[1]
 return msg
}
const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const[err,setErr] = useState('')
  const [addBook,res] = useMutation(booksQueries.ADD_BOOK,{
    refetchQueries:[{query:booksQueries.ALL_BOOKS}]
  })
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('add book...')
    let msg 
    let resault 
    try{
      resault = await addBook({
        variables:{
          title,author,published:Number(published),genres
        }
      })
    } catch(e){if ({Error}){
      const err = errMsg(Error(e)) 
      setErr(`Error : ${err}`)
      return 
    } }
     if(resault){
      setErr('done')
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
      return
     }
      msg = errMsg(res)
      if(msg)setErr(`Error : ${msg}`)

  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      {err && <p> {err}</p>}
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
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
