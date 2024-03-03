import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate=useNavigate()
  function handleSubmit(event){
    event.preventDefault()
    let username=event.target.username.value
    let password=event.target.password.value
  console.log(username+"   "+password)
  
  let requestOptions={
    method:"POST",
    headers:{//it will work if we dont mention the content type because it will by itself add because of JSOn.Stringify 
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        username,
        password
    }),
    credentials:"include"//this is very important because frontend and backend are running in different servers
  
  }
  
  fetch("http://localhost:4000/login",requestOptions)
  .then((response)=>{
   
    if(response.status=="200"){
       return response.json()
    }
    else{
        throw new Error("failed")
    }
    
  })
  .then((data)=>{
    alert(data.message)
  navigate("/home")
    
  })
  .catch((error)=>alert(error))
  }
  

  return (

        <div className="h-screen w-screen p-3 bg-indigo-500 ">
    <form onSubmit={handleSubmit} className="bg-gray-200 m-5 ml-80 mt-60 p-5 w-max rounded-lg grid items-center justify-center gap-2">
      <label>Username :     
      <input id="username" placeholder="username" className=" p-2 rounded-lg font-normal mx-2"/>
  </label>
     
      <label>Password : 
      <input id="password" placeholder="password" className=" p-2 rounded-lg font-normal mx-3"/>
  </label>
      
      <input type="submit" className="bg-blue-600 rounded-lg p-2 w-max items-center ml-28"/>
    </form>
  </div>
   
  )
}

export default App



