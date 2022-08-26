/** بسم الله الرحمن الرحيم */
const Genres = ({genres,setGenre})=>{
  if (!genres) return <p> no genres ...</p>
  const handleGenre = (e)=>{
    setGenre(e.target.value)
  }
  return (
    <div>
      <h4>genres</h4>
      <button key={0} value='' onClick={handleGenre}>All</button>
      {genres.sort().map((g,i)=>{
         return  g? <button key={i+1} value={g} onClick={handleGenre}>{g}</button>:null
      })}
    </div>
  )
  }
export default Genres