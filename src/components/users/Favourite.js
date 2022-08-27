/** بسم الله الرحمن الرحيم */
import { useQuery } from '@apollo/client'
import gqlQueries from '../../queries'
import BooksList from '../books/BooksList'
const Favourite = (props) => {
let currentUser = useQuery(gqlQueries.userQueries.ME)
if (currentUser.data && currentUser.data.me) 
  {currentUser = currentUser.data.me}
const genre = currentUser ? currentUser.favouriteGenre:''
const books =  useQuery(gqlQueries.booksQueries.ALL_BOOKS,{
  variables:{genre}
})
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h3>favourite Genre</h3>
      {
         books.loading ? <div>loadding ...</div>
         :books.data&&books.data.allBooks?
         <div>
          <Display books= {books.data.allBooks} genre={genre} />
         </div>
         : <div> no data</div>
      }
    </div>
  )

}
const Display = ({books,genre})=>{
  return (
    <>
        {genre && 
        <div>
        <p> you got a {books.length} <b>{books.length===1 ? 'Book' :'Books'} </b>in 
        <i> {genre} </i>
        </p> 
        <BooksList books={books} dontSet={genre} />
        </div>
        }
        {!genre &&
        <p> you don't have a favourite genre</p>
        }
          
    </>
  )
}
export default Favourite
