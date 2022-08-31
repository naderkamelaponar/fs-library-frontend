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
const USER_DATA=gql`
fragment userData on User {
  id
  username
  favouriteGenre
}
`
const CREATE_USER = gql`
mutation CreateUser($username: String!, $favouriteGenre: String!, $password: String!) {
  createUser(username: $username, favouriteGenre: $favouriteGenre, password: $password) {
   ...userData 
  }
}${USER_DATA}
`

const SET_FAVOURITE= gql`
mutation setFavourite( $genre:String!) {
  setFavourite(genre: $genre) {
    ...userData 
  }
}${USER_DATA}
`
const ME = gql`
query Me {
  me {
    ...userData
  }
}${USER_DATA}
`

const userQueries = {LOGIN ,CREATE_USER , ME, SET_FAVOURITE}
export default userQueries