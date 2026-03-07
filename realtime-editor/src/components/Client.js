import React from "react";

const Client = ({ username }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <div
        style={{
          height: "35px",
          width: "35px",
          borderRadius: "50%",
          background: "#4CAF50",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          marginRight: "10px",
        }}
      >
        {username?.charAt(0).toUpperCase()}
      </div>
      <span>{username}</span>
    </div>
  );
};

export default Client;