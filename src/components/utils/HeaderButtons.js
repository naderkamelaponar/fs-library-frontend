/** بسم الله الرحمن الرحيم */
const HeaderButtons =({token,goToPage,LogOut,liveDataC,resetLiveDataC}) =>{
  const liveMsg= liveDataC ? liveDataC===1 ?'1':'1+':''
  const liveStyle= liveDataC ? {backgroundColor:'green',color:'white'}:{}
  return (
    <div style={{"textAlign":"center"}}>
    <button onClick={() => goToPage('authors')}>authors</button>
    <button style ={liveStyle}onClick={() => 
      {if(liveDataC) resetLiveDataC()
      goToPage('books')}}>books {liveMsg && liveMsg}</button>
    {token && <button onClick={() => goToPage('add')}>add book</button>} 
    {token && <button onClick={() => goToPage('favourite')}>Favourite</button>}
    {!token && <button onClick={() => goToPage('login')}>Login</button>}
    {!token && <button onClick={() => goToPage('createUser')}>new user</button>}
    {token && <button onClick={LogOut}>LogOut</button>}
  </div>
  )

}
export default HeaderButtons
