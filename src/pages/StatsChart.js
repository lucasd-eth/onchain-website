import React from "react";
import WalletProfitChart from "../components/WalletDistributionRatio";
import ChartComponent from "../components/TokenDistributionRatio";

const StatsChart = () => {
    return (
        <>
            <div>
                <h1>Biểu đồ thống kê thông số</h1>
                <WalletProfitChart />
            </div>
            <div>
                <h1>Biểu đồ thống kê token</h1>
                <ChartComponent />
                </div>
        </>
    );
};

export default StatsChart;

