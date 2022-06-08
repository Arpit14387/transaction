import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import {BrowserRouter, Routes,  Route} from "react-router-dom";
import Newteam from "./routes/newteam.js"
import Main from "./routes/main.js"
// import Select from './routes/selectteam';
import Dist from "./routes/dist.js"
import Settle from "./routes/settle.js"
import History from "./routes/history.js"
import Home from "./routes/home.js"
import Login from "./routes/login.js"
import All from "./routes/all.js"
function App() {
 
return(
  <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Login />}/>
      {/* <Route exact path="/" element={<Select />}/> */}
        <Route path="/new" element={< Newteam/>}/>
        <Route path="/view" element={< Main/>}/>
        <Route  path="/" element={<Main />}>
      <Route path="team" element={<Main />} />
      <Route path=":team" element={<Main />} />
        </Route>
        <Route  path="/" element={<Dist />}>
      <Route path="dist" element={<Dist />} />
      <Route path=":id" element={<Dist />} />
        </Route>
        <Route  path="/all" element={<All />}/>
      
        <Route path="/" element={<Settle />}>
      <Route path="settle" element={<Settle />} />
      <Route path=":id" element={<Settle />} />
        </Route>
        <Route  path="/" element={<Home />}>
      <Route path="home" element={<Home />} />
      <Route path=":team" element={<Home />} />
        </Route>
        <Route path="/" element={<History />}>
      <Route path="history" element={<History />} />
      <Route path=":team" element={<History />} />
        </Route>
        
        
      </Routes>
      </BrowserRouter>
)
  
}

export default App;
