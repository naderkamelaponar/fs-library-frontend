/** بسم الله الرحمن الرحيم */
import { useState } from "react";
const useInput = (type='text')=> {
    const [value,setValue] = useState('')
    const onChange= (e)=>{
            setValue(e.target.value)
    }
    const resetValue = ()=>{
        setValue('')
    }
    return {
        type,value,onChange,form:{resetValue}
    }
}
export default useInput