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
const CREATE_USER = gql`
mutation CreateUser($username: String!, $favouriteGenre: String!, $password: String!) {
  createUser(username: $username, favouriteGenre: $favouriteGenre, password: $password) {
    id
    username
    favouriteGenre
  }
}
`
const SET_FAVOURITE= gql`
mutation setFavourite( $genre:String!) {
  setFavourite(genre: $genre) {
    id
    username
    favouriteGenre
  }
}
`
const ME = gql`
query me {
  me {
    id
    favouriteGenre
    username
  }
}
`

const userQueries = {LOGIN ,CREATE_USER , ME, SET_FAVOURITE}
export default userQueries