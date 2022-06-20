import React from "react";

function Loading(props) {
  return (
    <div className={`d-flex ${props.className}`} color={props.color}>
      <div
        className="spinner-border"
        role="status"
        style={{ maxWidth: "25px", maxHeight: "25px" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
