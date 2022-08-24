/** بسم الله الرحمن الرحيم */
import { useState , useEffect } from 'react'
import {useMutation } from '@apollo/client'
import gqlQueries from '../queries'
const Login = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [msg,setMsg] = useState('')
  const [login,res] = useMutation(gqlQueries.loginQueries.LOGIN,{
    onError:(error)=>{
      setMsg(error.graphQLErrors[0].message)
    }
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
    const resault = await login({
        variables:{
            username:userName,password
          }
    })
    
    if (!resault.data){
      return
    }
    setUserName('')
    setPassword('')
  }

  return (
    <div>
      {msg && msg}
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={userName}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type={"password"}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
