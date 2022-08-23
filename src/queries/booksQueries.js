/** بسم الله الرحمن الرحيم */
import {gql} from '@apollo/client'
const ALL_BOOKS = gql `
query {
    allBooks {
        title
        author {
            id
            name
            born
            bookCount
        }
        published
        genres
        id
    }
}
`
const ADD_BOOK = gql`
mutation addBook
(
    $title:String!, $author:String!, $published:Int!, $genres:[String!]!
)
{
    addBook (title:$title,author:$author,published:$published,genres:$genres)
{
id
title
author{
    id
    name
    born
    bookCount
}
published
genres  
}
}
`

const booksQueries = {ALL_BOOKS,ADD_BOOK}
export default booksQueries