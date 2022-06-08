import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react";
import {useLocation, useSearchParams , Link, useNavigate} from "react-router-dom";
import { GoogleLogout } from 'react-google-login';

export default function All() {
    var x=0;
    const [searchParams, setSearchParams] = useSearchParams();
    // const [id,setId]= useState("")
    const [teams,setTeams]= useState(["loading"])
    const [name2,setName2] =useState("")
    const navigate = useNavigate();
useEffect(()=>{
    var id=sessionStorage.getItem("gid")
    var name=sessionStorage.getItem("gname")
    setName2(name)
    // console.log(name2)
    const get=async (req,res)=>{
       const data=await axios.get(`https://transactionapi14387.herokuapp.com/auth/id/${id}`) 
       console.log(data.data)
       setTeams(data.data)
    }
    get()
},[])


const logout=()=>{

    sessionStorage.clear("gid")
    sessionStorage.clear("gname")
    // console.log("logged out")
    navigate(`/`);
}

function show()
{
    if(parseInt(x%2)==0)
    {
    teams.map((o,ind)=>{
       document.getElementById(`disp${ind}`).style.display="inherit"
       document.getElementById("grp").innerHTML="Groups &#9650;"
    })
}
else{
    teams.map((o,ind)=>{
        document.getElementById(`disp${ind}`).style.display="none"
        document.getElementById("grp").innerHTML="Groups &#9660;"
     })
}
x++;
}



  return (
    <div className='center '>
        <div className="bg"></div>

        <div className='nav'>
      <h3 onClick={logout} className='left color1 shake-slow shake-constant'>EasySplit</h3>
      <h3  className='right color2 '>{name2}</h3>
      </div>
      
      <br/>
      

<div className=''>
    <p className='t1'>Making Life Easier</p>
</div>



<div className='bottom'>
      <h2 id="grp" onClick={show} className='grp'>Groups &#9660;</h2>
{
    teams.map((o,index,key2)=>{
        return(
            <div className='teamslist' id={`disp${index}`} style={{"display": "none"}} >
                <Link  className='done size' to={`/home?team=${teams[teams.length-index-1].team}`}>{teams[teams.length-index-1].team}</Link>
                <h5  >{new Date(teams[teams.length-index-1].createdAt).toDateString()}</h5>
                {/* {name2} */}
            </div>
        )
    })
}
    </div>
    <h2 onClick={()=>{navigate("/new")}} className='newgrp'>+</h2>
    </div>
  )
}
