import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Signin from './components/Signin';
import Static from './components/Static/source/Static';
import Drinks from './components/Drinks';
import NonVeg from './components/NonVeg';
import Veg from './components/Veg';
import Service from './components/Service';
import { CallWaiter } from './components/CallWaiter';

// 62cc57e6c89033555d695e97 - RoomId

// 62ca6d085c7d23c5fb3a16b5 - LodgeId


function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path = "/:id/login" exact element = {<Login />} />
            <Route path = "/:id/signin" exact element = {<Signin />} />
           <Route path = "/:id/static" exact element  = {<Static />} />
           </Routes>
        </Router>
    </div>
  );
}

export default App;
