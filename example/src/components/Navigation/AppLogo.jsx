import React from "react";
import { Icon } from "antd";

export default function AppLogo() {
  const logoContainerStyle = {
    float: "left",
    color: "#fff",
    width: "60px",
    height: "31px",
    margin: "16px 24px 16px 0",
  };

  return (
    <div className="logo" style={logoContainerStyle}>
      <Icon type="fund" style={{ fontSize: "36px", verticalAlign: "top" }} />
    </div>
  );
}
