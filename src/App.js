import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Signin from './components/Signin';
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
            <Route path = "/:id/drinks" exact element = {<Drinks />} />
            <Route path = "/:id/nonveg" exact element = {<NonVeg />} />
            <Route path = "/:id/veg" exact element = {<Veg />} />
            <Route path = "/:id/services" exact element = {<Service />} />
            <Route path = "/:id/callawaiter" exact element = {<CallWaiter />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
