/** بسم الله الرحمن الرحيم */
import { useState , useEffect } from 'react'
import {useMutation } from '@apollo/client'
import gqlQueries from '../queries'
const errMsg = (res)=>{
  const err = res['error']? res['error']:null
  let msg = err? Object.keys(err).filter((a)=>{
   if(a==='message')return err[a]
   return ''
 }):null
 return msg? err[msg] :null
}
const Login = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [ler,setLer] = useState('')
  const [login,res] = useMutation(gqlQueries.loginQueries.LOGIN)
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
    login({
        variables:{
            username:userName,password
          }
    })
    
    if (!res.data) {
     const msg = errMsg(res)
     setLer(msg)
    }
    setUserName('')
    setPassword('')
  }

  return (
    <div>
      {ler}
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
