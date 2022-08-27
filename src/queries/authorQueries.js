/** بسم الله الرحمن الرحيم */
import { gql  } from '@apollo/client'
const ALL_AUTHORS = gql`
    query allAuthors {
        allAuthors {
            id
            name
            born
            bookCount
          }
    }
`
const EDIT_BORN = gql`
    mutation editBorn ($name:String!,$born:Int!)       
    {
        editBorn (name:$name,born:$born)
        {
            name
            born
        }
    }
`
const authorsQueries = {ALL_AUTHORS,EDIT_BORN}
export default authorsQueries