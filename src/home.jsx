import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const [name, setName] = useState("");
  const[session,setSession]=useState("")
  function getCookieDetails() {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",//this is very important because frontend and backend are running in different servers
    };

    fetch("http://localhost:4000/protected", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error occurred");
        }
      })
      .then((res) => {
        setName(res.username);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getCookieDetails();
  }, []);

  

  async function SetSession(){
   const response=await axios.get("http://localhost:4000/setSession")
   console.log(response)
  }

  async function GetSession(){
    const response=await axios.get("http://localhost:4000/getSession")
    console.log(response)
  }

  return (
    <>
   <p>Hello {name}</p>;
   <button className="m-10 p-2 bg-blue-500 rounded-xl" onClick={()=>{SetSession()}}>SetSession</button>
   <button className="m-10 mt-2 p-2 bg-blue-500 rounded-xl" onClick={()=>{GetSession()}}>GetSession</button>
   <p>Session : {session}</p>
  </>
  )
  
 
}
