import axios from "axios";
import {useEffect, useState} from "react";
import {useLocation, useSearchParams, Link } from "react-router-dom";

export default function Dist(){
    const [name,setName]= useState([]);
    const [team,setTeam]= useState("")
const [moneygiven,setMoneygiven]= useState([]);
const [moneyowed,setmoneyowed]= useState([]);

var totalgiven=0;
let id=(useLocation().search.split("=")[1]);

    useEffect(()=>{
        const set=async (req,res)=>{
            let isMounted = true;
            res= await axios.get(`https://transactionapi14387.herokuapp.com/team/id/${id}`)
             setTeam(res.data.team)
             setName(res.data.names);
             setMoneygiven(res.data.moneygiven);
             setmoneyowed(res.data.moneyowed);
             console.log(name)
        }
        set()
        
    },[])

    function totalgiv(){
        moneygiven.map((o,index)=>{
          totalgiven+=moneygiven[index]   
        })
        return totalgiven;
    }

    totalgiv()
  
    return(
        <div className="dist">
            <Link className="left2 left left3" to={`/home?team=${team}`}>HOME</Link>
            <div className="totalc">
            
                {/* <h1 className="ran">{team}</h1> */}
              
                <table >

                    <tr>
                         <th className="head">Name</th>
                         <th className="head">Total Money Given = {totalgiven}</th>
                         <th className="head">Total share</th>
                    </tr>
                    {
                    name.map((i,index)=>{
                        return(
                           <tr>
                               <th>{name[index]}</th>
                               <th>{moneygiven[index]}</th>
                               <th>{Math.floor(moneyowed[index])}</th>
                           </tr>
                           

                        )
                    })
                }
                        
                </table>
                
                
            </div>
            <br/>
         <Link className="done pay2" to={`/settle?id=${id}`}>Settle Now...</Link>
    </div>
    )
}