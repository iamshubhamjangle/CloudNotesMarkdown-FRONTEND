import React from "react";
import "./MainHeader.css";

function MainHeader(props) {
  const children = props.children;
  const title = props.title;

  return (
    <div className="mainback">
      <div className="page row justify-content-center">
        {title && (
          <>
            <h1 className="heading">{title}</h1>
            <hr />
          </>
        )}
        <div style={{ minHeight: "60vh" }}>{children}</div>
      </div>
    </div>
  );
}

export default MainHeader;
