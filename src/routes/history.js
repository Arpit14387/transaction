import axios from "axios";
import {useEffect, useState} from "react";
import {useLocation, useSearchParams , Link} from "react-router-dom";



export default function History()
{
  // let location=useLocation();
  // console.log(location)
   
    const [team,setTeam]= useState([""])
    const [name,setName]= useState([]);
    const [id,setId]= useState("");
    const [history,setHistory]= useState([])
    const [note,setNote]= useState([])
const [searchParams, setSearchParams] = useSearchParams();

useEffect(()=>{
    var team=searchParams.get("team");

    const set=async (req,res)=>{
        res= await axios.get(`https://transactionapi14387.herokuapp.com/team/name/${team}`)
        //  console.log(res.data[0].names)
        console.log(res.data)
        setTeam(res.data[0].team)
         setId(res.data[0]._id);
         setName(res.data[0].names);
         setMoneygiven(res.data[0].moneygiven);
         setmoneyowed(res.data[0].moneyowed);
         setHistory(res.data[0].history);
         setNote(res.data[0].note);
    }
    set()
},[])

return(
    <div className=" w">
        
        <Link to={`/home?team=${team}`} className="w1">{team}</Link>
         {
         note.map((o,index)=>{
             return(
                 <div className="history">
                     <h2>{note[index]}</h2>
                     <p>{history[index]}</p>
                     </div>
             )
         })
        }
    </div>
)

}