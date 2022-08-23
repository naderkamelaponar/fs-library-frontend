/** بسم الله الرحمن الرحيم */
import {gql} from '@apollo/client'
const LOGIN = gql`
mutation login
( $username:String!, $password:String! )
{
    login(username: $username, password: $password) {
      value
    }
  }
`

const loginQueries = {LOGIN}
export default loginQueries