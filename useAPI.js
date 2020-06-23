import {useState, useEffect} from 'react'
import axios from 'axios'

const useAPI = endpoint => {
  const [data, setData] = useState([]) // initial state empty array

  //To call data when component is mounted, 
  useEffect(()=> {
    getData()
  },[])

  const getData = async () => {
    const response = await axios.get(endpoint)
    setData (response.data)
  }

  return data;
}

export default useAPI;
