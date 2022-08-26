/** بسم الله الرحمن الرحيم */
const AuthorsList = ({authors})=>{
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors && authors.map((a,i) => (
            <tr key={i}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}
export default AuthorsList