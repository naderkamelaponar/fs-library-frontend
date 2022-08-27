/** بسم الله الرحمن الرحيم */
import {useMutation} from '@apollo/client'
import gqlQueries from '../../queries'
import { FaRegHeart  } from "react-icons/fa";
const Genre = ({genre,dontSet})=>{
    const [setFavourite ] = useMutation(gqlQueries.userQueries.SET_FAVOURITE,{
        onError:(error)=>{
          console.log('error,',error)       
          },refetchQueries:[{query:gqlQueries.userQueries.ME}]
      })
      const handleFavourite = async(e)=>{
        e.preventDefault()
        await setFavourite({
            variables:{
              genre
            }
          })
      }

    return (
        <h5> {genre} {' '}
        {genre !== dontSet && <FaRegHeart onClick={ handleFavourite }
        />
    }
         
        </h5>
    )

  }
  
  export default Genre