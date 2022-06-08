// import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import {useLocation, useSearchParams , Link} from "react-router-dom";



export default function Main()
{
  // let location=useLocation();
  // console.log(location)
    var tempnote;
    var tempmoney=0;

    const [num,setNum]= useState([""])
    const [name,setName]= useState([]);
    const [id,setId]= useState("");
    const [history,setHistory]= useState([])
    const [note,setNote]= useState([])
const [moneygiven,setMoneygiven]= useState([]);
const [moneyowed,setmoneyowed]= useState([]);
const [searchParams, setSearchParams] = useSearchParams();
const [team2,setTeam2]= useState("")
useEffect(()=>{
    var team=searchParams.get("team");
    setTeam2(team);
    const set=async (req,res)=>{
        res= await axios.get(`https://transactionapi14387.herokuapp.com/team/name/${team}`)
        //  console.log(res.data[0].names)
        console.log(res.data)
         setId(res.data[0]._id);
         setName(res.data[0].names);
         setMoneygiven(res.data[0].moneygiven);
         setmoneyowed(res.data[0].moneyowed);
         setHistory(res.data[0].history);
         setNote(res.data[0].note)
    }
    set()
},[])

async function update(){
    const data={
      "team": searchParams.get("team"),
      "names": name,
      "moneygiven": moneygiven,
      "moneyowed": moneyowed,
      "history" : history,
      "note": note

    }
    await axios.put(`https://transactionapi14387.herokuapp.com/update/${id}`,data)
}


  var temp=[0,0,0];
  var temp2=[0,0,0];
  var updatemoneyowed=0;
  var tempname=[]

const updateonequal=(val,between=[])=>{
  if(!tempmoney==0)
  {
   val= tempmoney
  var length=between.length;    
  val=val/length;
  
    name.map((p,ind)=>{
      if(between.includes(name[ind]))
      {
       moneyowed[ind]+=val;
      }
    })
    
    tempname=[];
    setNote(note.push(tempnote || "none"))
    setHistory(history.push(`${tempmoney} paid by ${document.getElementById("selectname").value} distributed b/w ${between}`))
    update()
  }
}

const updateowed=(mon=[],nam=[])=>{
  // console.log(mon,nam)

  nam.map((p,ind)=>{
    if(nam.includes(name[ind]))
    {
     moneyowed[ind]+=mon[ind];
    }
  })
  
  tempname=[];
  setNote(note.push(tempnote || "none"));
  setHistory(history.push(`${tempmoney} paid by ${document.getElementById("selectname").value} distributed b/w ${nam}`))
   update()
}

  const showbutt=()=>{
    if(document.getElementById("butt").style.display=="none")
    document.getElementById("butt").style.display="initial"
    else
    document.getElementById("butt").style.display="none"
  }

  function myFunction() {
      if(document.getElementById("myDropdown").style.display=="none")
    document.getElementById("myDropdown").style.display="inherit";
    else
    document.getElementById("myDropdown").style.display="none"
  }

  const newfunc1=()=>{
    var f=document.getElementById("selectname").value;
    var i= name.indexOf(f);
    moneygiven[i]+=tempmoney;
    updateonequal(updatemoneyowed,name)
    // console.log(moneygiven);
  }

  const newfunc2=()=>{
    var f=document.getElementById("selectname").value;
    var i= name.indexOf(f);
    moneygiven[i]+=tempmoney;
    updateonequal(updatemoneyowed,tempname)
    // console.log(moneygiven);
  }

  const newfunc3=()=>{
    var f=document.getElementById("selectname").value;
    var i= name.indexOf(f);
    moneygiven[i]+=tempmoney;
    updateowed(temp2,tempname)
    // console.log(moneygiven);
  }



  const showcustbutt=()=>{
    if(document.getElementById("custbutt").style.display=="none")
    document.getElementById("custbutt").style.display="initial"
    else
    document.getElementById("custbutt").style.display="none"
  }

//   const color=(i)=>{
// document.getElementById(i).style.backgroundColor="#04AA6D"
//   }

  const tempfunc=(i)=>{
    if(tempname.includes(name[i]))
    {
       var t=tempname.indexOf(name[i])
       tempname.splice(t,1)
       document.getElementById(i).style.backgroundColor="#c3c2fa"
    }
    else{
      tempname.push(name[i])
      document.getElementById(i).style.backgroundColor="#2af0a7"
    }
  }
  
  
  return (
    <div className="App">
<div>
     <Link className="left2" to={`/home?team=${team2}`}>HOME</Link>
        {/* <h1 className="expense">Add Expense</h1> */}
        <p className="rupee">&#x20B9;</p>
        </div>
    <input className="note" placeholder="Optional note" type="text" onChange={(e)=>{tempnote=e.target.value}}/>
 
        <button className="done">Add Note</button>
        <br/>
        <input className="paid"  type="number" placeholder="Rupees" onChange={(e)=>{tempmoney=parseFloat(e.target.value)}}></input>
          <label className="paid2" htmlFor="cars">Paid by </label>

<select name="cars" id="selectname" >
    
{
       name.map((k,index)=>{
         return(
             
        <option className="option" value={name[index]}>{name[index]}</option>
          ) }
        )
        }
        
</select>


<br/>
         
  
  {/* <input type="submit" value="Submit" /> */}
      <h1 className="expense">Distribution</h1>
      <button className="equal" onClick={newfunc1}>All Equally</button>
      <button className="select" onClick={showbutt}>Select Equally</button>

      
     <div id='butt' style={{"display": "none"}}>
     {
       name.map((k,index)=>{
         return(
          <div  >
             <button className="equalbutt"  onClick={()=>{tempfunc(index)}} id={index} >{name[index]}</button>
          </div>
         )
       }
        )
        
     }
     <button className="done" onClick={newfunc2}>Done</button>
     </div>
     <br/>
     <button className="cust" onClick={showcustbutt}>Select Custom</button>
     <div id='custbutt' style={{"display": "none"}}>
     {
       name.map((k,index)=>{
         return(
          <div  >
            <input className="custbutt" name={name[index]} placeholder={` ${name[index]}'s share`} onChange={(e)=>{tempname[index]=name[index];temp2[index]=parseInt(e.target.value)}} type="number"></input>
          </div>
         )
       }
        )
        
     }
     <button className="done" onClick={newfunc3}>Done</button>
     </div>
    
    {/* <Link to={`/dist?id=${id}`}>jnke</Link> */}
   

    </div>
  );
}