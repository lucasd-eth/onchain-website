import React from 'react';
import Menubar from './components/Menubar';
import Home from './pages/Home.js';
import WalletDashboard from './pages/WalletDashboard.js';
import Transactions from './pages/Transactions.js';
import Watchlist from './pages/Watchlist.js';
import WalletManagement from './pages/WalletManagement.js';
import Follow from './pages/Follow.js';
import StatsChart from './pages/StatsChart.js';
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
        <Route path="/Watchlist" element ={<Watchlist/>} />
        <Route path="/WalletManagement" element ={<WalletManagement/>} />
        <Route path="/Follow" element ={<Follow/>} />
        <Route path="/StatsChart" element ={<StatsChart/>} />
      </Routes>
    </Router>
  );
}

export default App;
