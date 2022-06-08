import React, {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

export default function Login() {
    const client_Id="968127370331-hlrg0jrtkvpsqv6en52ci43ieqtn4u2o.apps.googleusercontent.com";
    const navigate = useNavigate();
   const responseGoogle= async (res)=>{
       const store=sessionStorage.setItem("gid", res.googleId);
       const name=sessionStorage.setItem("gname",res.profileObj.name);
    
     const handleClick = () => {
        //  console.log(res.profileObj.name)
        navigate(`/all`);
    }
    handleClick();
   }

 

  return (
      <div className='center '>
          <div className="waviy b">
   <span style={{"--i":"1"}}>S</span>
   <span style={{"--i":"2"}}>p</span>
   <span style={{"--i":"3"}}>l</span>
   <span style={{"--i":"4"}}>i</span>
   <span style={{"--i":"5"}}>t</span>
 
   <span style={{"--i":"6"}}>E</span>
   <span style={{"--i":"7"}}>a</span>
   <span style={{"--i":"8"}}>s</span>
   <span style={{"--i":"9"}}>y</span>
   

  </div>
  <br/>
  <div className='ggl'>
      <br/>
    <GoogleLogin
    clientId={client_Id}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
</div>
 </div>
  )
}
