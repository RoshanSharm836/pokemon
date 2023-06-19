import React from "react";
import Card from "./Card";

function Dashboard() {
  return (
    <div>
      <div className="header">dashboard</div>
      <div className="container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Dashboard;
