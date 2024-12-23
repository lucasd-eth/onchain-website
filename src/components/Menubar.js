import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { TbWallet } from "react-icons/tb";
import { IoSwapHorizontal } from "react-icons/io5";
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
                    <IoSwapHorizontal />
                    <Link to="/Transactions">Transactions</Link>
                </li>
            </ul>
        </div>
    );
};

export default Menubar;
