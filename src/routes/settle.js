import axios from "axios";
import {useEffect, useState} from "react";
import {useLocation, useSearchParams , Link} from "react-router-dom";

export default function Settle(){
    const [name,setName]= useState([]);
    const [team,setTeam]= useState("")
var moneygiven=[]
var moneyowed=[]

const [savemoneygiven,setSavemoneygiven]= useState([]);
const [savemoneyowed,setSavemoneyowed]= useState([]);
const [settle2,setSettle2] =useState([])
const [history,setHistory]= useState([])
const [note,setNote]= useState([])
var totalgiven=0;
var give=0;
let id=(useLocation().search.split("=")[1]);

    useEffect(()=>{
        const set=async (req,res)=>{
            res= await axios.get(`https://transactionapi14387.herokuapp.com/team/id/${id}`)
            console.log(res.data)
             setTeam(res.data.team)
             setName(res.data.names);
             setHistory(res.data.history);
             setNote(res.data.note)
             setSavemoneygiven(res.data.moneygiven);
            
             setSavemoneyowed(res.data.moneyowed)
             
             
        }
        set()
        
        
    },[])

    // useEffect(()=>{
    //     setTimeout(calculate,100)
    // },[savemoneyowed])
    async function update(){
        const data={
          "team": team,
          "names": name,
          "moneygiven": savemoneygiven,
          "moneyowed": savemoneyowed,
          "history" : history,
          "note": note
    
        }
        await axios.put(`https://transactionapi14387.herokuapp.com/update/${id}`,data)
    }
   

    const setle=()=>{
        if(!give==0)
        {
       var p=document.getElementById("select1").value;
       var r=document.getElementById("select2").value;
       var i=name.indexOf(p);
       var j=name.indexOf(r);
       
       var f=savemoneygiven;
       console.log(moneygiven)
       f[i]+=give;
       f[j]-=give;
       setNote(note.push("Settlement"))
        setHistory(history.push(`${p} paid ${r} ${give} rupees`))
       setSavemoneygiven(f);
    //    setMoneygiven(f)
       console.log(savemoneygiven)
       update()
       
    //    calculate()
    }}

   

    return(
        <div className="dist">
            
            <Link className="left2" to={`/home?team=${team}`}>HOME</Link>


      <div>
          <h2>Select payer</h2>
          <select id="select1">
      {
                name.map((o,index)=>{
                    return(
                        
                   <option value={name[index]} >{name[index]}</option>
                    )
                })
               
            }
            </select>

<h2>Select recipient</h2>
<select id="select2">
      {
                name.map((o,index)=>{
                    return(
                        
                   <option value={name[index]}>{name[index]}</option>
                    )
                })
               
            }
            </select>
<br/>
            <input className="inp" onChange={(e)=>{give=parseFloat(e.target.value)}} placeholder="enter amount"></input>
      </div>
      <button className="done" onClick={setle}>Settle Now</button>
        </div>
    )
}