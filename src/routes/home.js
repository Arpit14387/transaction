import axios from "axios";
import {useEffect, useState} from "react";
import {useLocation, useSearchParams, Link,useNavigate } from "react-router-dom";


export default function Home(){
    const [name,setName]= useState([]);
    const navigate = useNavigate();
var moneygiven=[]
var moneyowed=[]
var x=0;

const [savemoneygiven,setSavemoneygiven]= useState([]);
const [savemoneyowed,setSavemoneyowed]= useState([]);
const [id,setId]= useState("")
const [settle,setSettle] =useState([])
const [settle2,setSettle2] =useState([])
const [payer,setPayer]= useState([]);
const [payee,setPayee]= useState([])
const [money,setMoney]= useState([])
var totalgiven=0;
var give=0;
let payer2=[];
let payee2=[];
let money2=[];
const [searchParams, setSearchParams] = useSearchParams();
var team;
team=searchParams.get("team");
    useEffect(()=>{
        const set=async (req,res)=>{
           
            res= await axios.get(`https://transactionapi14387.herokuapp.com/team/name/${team}`)
            // console.log(res.data)
             
             setName(res.data[0].names);
             setId(res.data[0]._id)
             setSavemoneygiven(res.data[0].moneygiven);
            moneyowed=res.data[0].moneyowed;
             setSavemoneyowed(res.data[0].moneyowed)
            
             
        }
        set()
        
        
    },[])

    useEffect(()=>{
        setTimeout(calculate,100)
    },[savemoneyowed])

    const calculate=()=>{
        moneygiven=savemoneygiven;
        var sum=0;
        name.map((p,ind)=>{
          sum=sum+savemoneygiven[ind];
        })
        
        
        // var avg=sum/Object.keys(data).length;
        var arr=new Array(name.length);
        name.map((p,index)=>{
          arr[index]=savemoneygiven[index]-savemoneyowed[index];
        })
        
          arr.map((o,ind)=>{
        var maxcredit=Math.max(...arr);
        var maxdebit =Math.min(...arr);
       
        var maxcreditind=arr.indexOf(maxcredit);
        var maxdebitind=arr.indexOf(maxdebit);
    
        var min=Math.min(maxcredit,-1*maxdebit);
    
        savemoneygiven[maxcreditind]=savemoneygiven[maxcreditind]-min;
        savemoneygiven[maxdebitind]=savemoneygiven[maxdebitind]+min;
        
        arr[maxcreditind]=arr[maxcreditind]-min;
        arr[maxdebitind]=arr[maxdebitind]+min;
    
        
        // console.log(`${name[maxdebitind]} gives ${name[maxcreditind]} ${min} rupee`)
        if(!(min==0))
        {
            money2[ind]=Math.floor(min)
            payee2[ind]=name[maxcreditind];
            payer2[ind]=name[maxdebitind]
            
        }
        // setSettle(settle.push(`${name[maxdebitind]} give ${name[maxcreditind]} ${Math.floor(min)} rupees`))
      
      })
    //  setSettle2(settle || "All settled up")
    //  setSettle([])
     setMoney(money2)
     setPayee(payee2)
     setPayer(payer2)

    }

    const setle=()=>{
       var p=document.getElementById("select1").value;
       var r=document.getElementById("select2").value;
       var i=name.indexOf(p);
       var j=name.indexOf(r);
       
       var f=savemoneygiven;
    //    console.log(moneygiven)
       f[i]+=give;
       f[j]-=give;

       setSavemoneygiven(f);
    //    setMoneygiven(f)
    //    console.log(moneygiven)
    //    calculate()
    }

   const back=()=>{
       const gid=sessionStorage.getItem("gid");
       const gname=sessionStorage.getItem("gname")
navigate(`/all?id=${gid}&name=${gname}`)
   }

  
   function openNav() {
    document.getElementById("main").style.display="none"
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("main").style.marginLeft = "150px";
  }

  function closeNav() {
    document.getElementById("main").style.display="inherit"
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

 async function delet(){
     let text="U sure? \nThis action is permanent"
     if(window.confirm(text)){
        await axios.delete(`https://transactionapi14387.herokuapp.com/id/${id}`)
        navigate("/all")
     }
   
  }

  function temp(){
      console.log(document.querySelectorAll("table tr"))
  }
   

    return(
        <div className="dist2">
             <button id="main" className="openbtn" onClick={openNav}>&#9776;</button>
          <p className="tit">{team}</p>
          <img className="stork" src={"./stork.jpg"} alt="image"></img>
           <p></p>
            <div id="mySidebar" className="sidebar">
  <a className="closebtn" onClick={closeNav}>&times;</a>

  <Link className="hover" to={"/all"}>Home</Link>
  <Link className="hover" to={`/dist?id=${id}`}>Totals</Link>
  <Link className="hover" to={`/history?team=${team}`}>Activity</Link>
  <Link className="hover" to={`/settle?id=${id}`}>Settle</Link>
  <p onClick={delet} className="delete">Delete Group</p>

</div>

<div className="left p">
                    <p>To settle up, do this...</p>
                </div>
            <div className="tab height">
               
                <table className="height">

                    <tr>
                         <th className="head">Payer</th>
                         <th className="head">Reciever</th>
                         <th className="head">Amount</th>
                    </tr>
                    {
                    payer.map((i,index)=>{
                        if(money[index]>0)
                        {
                        return(
                        
                           <tr>
                               <td>{payer[index]}</td>
                               <td>{payee[index]}</td>
                               <td>{money[index]}</td>
                           </tr>
                        )
                        }
                        
                    })
                }
                        
                </table>

                <Link className="done pay" onClick={temp} to={`/team?team=${team}`}>Add an expense</Link>
                
                
            </div>
           
            </div>
    )
}