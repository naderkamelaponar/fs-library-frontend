/** بسم الله الرحمن الرحيم */
import { gql  } from '@apollo/client'
const ALL_AUTHORS = gql`
    query {
        allAuthors {
            id
            name
            born
            bookCount
          } 
    }
`
const authorsQueries = {ALL_AUTHORS}
export default authorsQueries