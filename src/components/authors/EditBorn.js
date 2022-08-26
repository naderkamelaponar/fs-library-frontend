/** بسم الله الرحمن الرحيم */
import { useMutation} from '@apollo/client'
import { useState } from 'react'
import gqlQueries from '../../queries/index'
import appHooks from '../../hooks'
const EditBorn = ({authors})=>{
  const [editBorn] = useMutation(gqlQueries.authorsQueries.EDIT_BORN,{
    refetchQueries:[{query:gqlQueries.authorsQueries.ALL_AUTHORS}]
  })
  const born = appHooks.useInput('number')
  const [selectedName,setSelectedName] = useState('')
  const handleEdit = (e)=>{
    e.preventDefault()
    if(!selectedName) return
    editBorn({
      variables:{
        name:selectedName,born:Number(born.value)
      }
    }) 
    born.form.resetValue()
    
  }
  const handleSelect =(e)=>{
    setSelectedName(e.target.value)
  }
  return (
    <div>
      <h3>Set Birthday</h3>
      <form onSubmit={handleEdit}>
            <p> 
              <select onChange={handleSelect}>
                <option value={''} >choose Name :</option>
                {authors.map(a=>{
                 return <option key={a.id} value={a.name} > {a.name}</option>
                })}
              </select>

            </p>
      <p> born : <input {...born}/ ></p>
      <p><button>update author</button></p>
    </form>
    <p><button onClick={()=>{
      born.form.resetValue()
    }}>reset</button></p>
    </div>
  )

}
export default EditBorn