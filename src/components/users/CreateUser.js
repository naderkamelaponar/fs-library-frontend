/** بسم الله الرحمن الرحيم */
import { useState  } from 'react'
import {useMutation } from '@apollo/client'
import appHooks from '../../hooks'
import gqlQueries from '../../queries'
const CreateUser = ({show}) => {
  const userName= appHooks.useInput()
  const password= appHooks.useInput('password')
  const repeatPassword= appHooks.useInput('password')
  const favouriteGenre = appHooks.useInput()
  const [msg,setMsg] = useState('')
  const [createUser ] = useMutation(gqlQueries.userQueries.CREATE_USER,{
    onError:(error)=>{
      console.log('error,',error)
        setMsg(error.graphQLErrors[0].message)
      }
  })
  
  if (!show) {
    return null
  }
  const submit = async (event) => {
    event.preventDefault()
    console.log('Create user ...')
    const resault = await createUser({
      variables:{
        username:userName.value,
        password:password.value,
        favouriteGenre:''
      }
    })
     if(!resault.data){
      return
     }
     console.log(resault)
     setMsg('done')
      userName.form.resetValue()
      password.form.resetValue()

  }
  return (
    <div>
      {msg && msg}
      <h3> create new user </h3>
      <form onSubmit={submit}>
        <div>
          username
          <input
           {...userName}
          />
        </div>
        <div>
          password
          <input
          {...password}
          />
        </div>
        <div>
          repeat password
          <input
          {...repeatPassword}
          />
        </div>
        <div>
          favourite Gener
          <input
          {...favouriteGenre}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateUser
