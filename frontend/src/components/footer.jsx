import React from "react";
import { Heart } from "./icons";

export const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        margin: "25px 0px 25px 0px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      Made with <Heart color="red" className="mx-1" /> by Shubham Jangle
    </footer>
  );
};
