import axios from "axios";
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import "./newteam.css"

export default function Newteam()
{
    const navigate= useNavigate()
    // sessionStorage.clear()
    var length=0;
    var tempname=[];
    
    var num=0;
    
    let temparr =new Array(20)
    temparr.fill("")
    
    var temp_name=[]

    var teamname="";
    const post=(async (req,res)=>{
        res= await axios.post("https://transactionapi14387.herokuapp.com/new",req )
       
     })

const temp=()=>{
document.getElementById("bt").style.visibility="inherit"
    if( !num==0 && !temp_name[num-1] )
    {
           return;
    }
    // setTempname(tempname.push(temp_name));
    document.getElementById(num).style.visibility="inherit";    
    
    if(num>0)
    tempname.push(temp_name[num-1])
    num++;
    console.log(temp_name[num-1])
   
    // console.log(temparr)
    length++;
    console.log(length)
}

const submit=()=>{
    if(teamname.length>0)
    {
    if(temp_name[length-1])
    tempname[length-1]=temp_name[length-1]
// console.log(tempname)
    let moarr=new Array(length);
    let mgarr=new Array(length)
    moarr.fill(0);
    mgarr.fill(0);
  
   let body=
    {
        "team": teamname,
       "names":tempname,
       "moneyowed": moarr,
       "moneygiven": mgarr,
       "google": sessionStorage.getItem("gid")
    };
    post(body)
    navigate("/all")
}
}

return(
    <div className="mid">
        {/* <label className="lab">Group name</label>
        <br/> */}
        <div className="temp2">
        <input type="text" className="grpname" placeholder="Group Name..." onChange={(e)=>{teamname=e.target.value}} name="" id="" />
        {/* <input type="number" placeholder="no. of people" onChange={(e)=>{num=e.target.value}}></input> */}
        <div>
            
       
            
            <button className="sub" id="bt" style={{"visibility": "hidden"}} type="submit" onClick={submit}>submit</button>
            <button className="add btnname " onClick={temp}>Add group member</button>
           
        </div>
        {
           temparr.map((p,index)=>{
               return(
                   <div>
                    
                <input className="names clean-slide" type="text" style={{"visibility": "hidden"}} id={index} placeholder={`Member's name`} required={true} onChange={(e)=>{temp_name[index]=e.target.value}} />
                <br/>
                </div>
               )
           })
           
        }
        </div>
    </div>
)

}