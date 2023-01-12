import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Signin from './components/Signin';
import Static from './components/Static/source/Static';
import MyOrders from './components/Orders/MyOrders';
import CallWaiter from './components/Call_A_Waiter/CallWaiter';
import { Transport } from './components/Transport/Transport';

// 62cc57e6c89033555d695e97 - RoomId

// 62ca6d085c7d23c5fb3a16b5 - LodgeId

function App() {
  return (
    <div className = "App">
        <Router>
          <Routes>
            <Route path = "/:id/login" exact element = {<Login />} />
            <Route path = "/:id/signin" exact element = {<Signin />} />
           <Route path = "/:id/static" exact element  = {<Static />} />
           <Route path = "/:id/myorders" exact element = {<MyOrders />} />
           <Route path = "/:id/callwaiter" exact element = {<CallWaiter />} />
           <Route path = "/:id/transport" exact element = {<Transport />} />
           </Routes>
        </Router>
    </div>
  );
}

export default App;
