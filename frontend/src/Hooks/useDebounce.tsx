import React, { useEffect, useState } from 'react'
import { VscArrowDown } from 'react-icons/vsc'

export default function useDebounce(value:string,delay:number) {
  const [debounceValue,setDebounceValue] = useState('');

  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceValue(value)
    },delay)

    return  () => clearTimeout(timer);
  },[value])

  return debounceValue;

}
