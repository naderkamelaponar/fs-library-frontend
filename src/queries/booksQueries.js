/** بسم الله الرحمن الرحيم */
import {gql} from '@apollo/client'
const BOOK_DATA =gql`
fragment BookData on Book {
  title
  published
  author {
    id
    name
    born
    bookCount
  }
  genres
  id
}
`
const ALL_BOOKS = gql `
query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookData
    }
  }${BOOK_DATA}
`

const ADD_BOOK = gql`
mutation addBook
(
    $title:String!, $author:String!, $published:Int!, $genres:[String!]!
)
{
    addBook (title:$title,author:$author,
      published:$published,genres:$genres)
  {...BookData }
}${BOOK_DATA}
`
const NEW_BOOK =gql`subscription NewBook {
  newBook {
    ...BookData
  }
}${BOOK_DATA}`
const booksQueries = {ALL_BOOKS,ADD_BOOK,NEW_BOOK}
export default booksQueries