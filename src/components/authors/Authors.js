/** بسم الله الرحمن الرحيم */
import { useQuery} from '@apollo/client'
import gqlQueries from '../../queries/index'
import EditBorn from './EditBorn'
import AuthorsList from './AuthorsList'
const Authors = (props) => {
  const authors = useQuery(gqlQueries.authorsQueries.ALL_AUTHORS)
  if (!props.show) {
    return null
  } 
  return authors.loading ? <div>loadding ...</div>:authors.data&&authors.data.allAuthors?
  <div>
    <AuthorsList authors={authors.data.allAuthors} />
    <EditBorn authors ={authors.data.allAuthors}/>
  </div>
  : <div> no data</div>
  
 
}

export default Authors
