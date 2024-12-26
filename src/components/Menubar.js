import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { TbWallet } from "react-icons/tb";
import { IoMdSwap } from "react-icons/io";
import { LuChartCandlestick } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineManageHistory } from "react-icons/md";
import { LuChartColumnBig } from "react-icons/lu";


import './Menubar.css';  // Sửa lại import CSS

const Menubar = () => {
    return (
        <div className="Menubar">
            {/* Header */}
            <div className="MenubarHeader">
                <img src="/bitcoinfirework.jpg" alt="logo_ichain" />
                <h1>aichain</h1>
            </div>

            {/* Menu Items */}
            <ul className="menuItems">
                <li>
                    <FiHome />
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <TbWallet />
                    <Link to="/WalletDashboard">Wallet Dashboard</Link>
                </li>
                <li>
                    <IoMdSwap />
                    <Link to="/Transactions">Transactions</Link>
                </li>
                <li>
                    <LuChartCandlestick />
                    <Link to="/Watchlist">Trending</Link>
                </li>
                <li>
                    <FaRegStar />
                    <Link to="/Follow">Follow</Link>
                </li>
                <li>
                    <MdOutlineManageHistory />
                    <Link to="/WalletManagement">WalletManagement</Link>
                </li>
                <li>
                    <LuChartColumnBig />
                    <Link to="/StatsChart">StatsChart</Link>
                </li>
            </ul>
        </div>
    );
};

export default Menubar;
