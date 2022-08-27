/** بسم الله الرحمن الرحيم */
const HeaderButtons =({token,goToPage,LogOut}) =>{
  return (
    <div style={{"textAlign":"center"}}>
    <button onClick={() => goToPage('authors')}>authors</button>
    <button onClick={() => goToPage('books')}>books</button>
    {token && <button onClick={() => goToPage('add')}>add book</button>} 
    {token && <button onClick={() => goToPage('favourite')}>Favourite</button>}
    {!token && <button onClick={() => goToPage('login')}>Login</button>}
    {!token && <button onClick={() => goToPage('createUser')}>new user</button>}
    {token && <button onClick={LogOut}>LogOut</button>}
  </div>
  )

}
export default HeaderButtons
