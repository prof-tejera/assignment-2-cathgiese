import React from "react";

const Screen = ({ minutes, seconds }) => {
    return (
      <div
        style={{
          // border: "1px solid black",
          width: 300,
          height: 70,
          textAlign: "center",
          marginBottom: 10,
          background: "white",
          fontSize: "50px",
          padding: "30px"
        }}
      >
        {minutes}m
        {seconds}s
      </div>
    );
  };
  
  export default Screen;
  