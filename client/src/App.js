import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react'


function App() {

  const [state, setState] = useState([])
  const [loading, setLoading] = useState()

  useEffect(() => {
  setLoading(true)
    // Get the data from the API
    const local = "http://localhost:8000"
    const url = process.env.NODE_ENV !== 'production' ? `${local}/api/location/search/Melbourne` : '/api/location/search/Melbourne'
    const data = axios.get(url)
    .then((response) => {
      setState(response.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err);      
    })
  
  }, [])

  const Local = () => {
    return (
      state.map(item => <div key={item.woeid}>{item.title}</div>)
    )
  }

  console.log(Local);
  // if(!loading) {
  //   return (
  //   <div> 
  //     <h1>Hello World</h1>
  //     <Local/>
  //   </div>
  // );} else {
  //   return(
  //     <div>Loading</div>
  //   )
  // }

  return (
    <main>
      <h1>Hello world</h1>
      {!loading ? <Local /> : <h3>Loading</h3>}
    </main>
  )

  
}

export default App;
