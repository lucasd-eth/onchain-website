import React from 'react';
import Menubar from './components/Menubar';
import Home from './pages/Home.js';
import WalletDashboard from './pages/WalletDashboard.js';
import Transactions from './pages/Transactions.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      {/*Thêm menubar ở đâY*/}
      <Menubar/>
      <Routes>
        <Route path ="/" element ={<Home/>} />
        <Route path ="/WalletDashboard" element ={<WalletDashboard/>} />
        <Route path="/Transactions" element ={<Transactions/>} />
      </Routes>
    </Router>
  );
}

export default App;
