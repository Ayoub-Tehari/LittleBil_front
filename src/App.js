
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import CustomerForm from './CustomerForm/CustomerForm';
import SalesView from './SalesView/SalesView';
import NoPage from "./NoPage/NoPage";
import Login from "./Login/Login";

function App() {
  return (
    <div className="App">
      <>
            <Router>
              <Routes>

                <Route path="/" element={<Login/>}/>
                <Route path="/customers/" element={<CustomerForm/>}/>
                <Route path="/sales/:customerId" element={<SalesView />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </Router>
          </>    
    </div>
  );
}

export default App;
