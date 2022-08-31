/** بسم الله الرحمن الرحيم */
import { useState , useEffect } from 'react'

import { useMutation } from '@apollo/client'
import appHooks from '../../hooks'
import gqlQueries from '../../queries'
const Login = (props) => {
  const userName= appHooks.useInput('text')
  const password= appHooks.useInput('password')
  const [msg,setMsg] = useState('')
  
  const [login,res] = useMutation(gqlQueries.userQueries.LOGIN,{
    onError:(error)=>{
      setMsg(error.graphQLErrors[0].message)
    },refetchQueries:[{me:gqlQueries.userQueries.ME}]
  })
  
  useEffect(() => {
    if ( res.data ) {
      const token = res.data.login.value
      props.authorize(token)
    }
  }, [res.data]) // eslint-disable-line
  if (!props.show) {
    return null
  }
  const submit = async (event) => {
    event.preventDefault()
    setMsg('wait....')
    await login({
        variables:{
            username:userName.value,password:password.value
          }
    })
    if (!res.data){
      return
    }
    setMsg('logged in')
    userName.form.resetValue()
    password.form.resetValue()
  }

  return (
    <div>
      {msg && msg}
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
        
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
