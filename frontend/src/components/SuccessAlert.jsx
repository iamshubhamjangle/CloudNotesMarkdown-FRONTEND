import React from "react";

function SuccessAlert({ children }) {
  return (
    <div
      className="alert alert-success alert-dismissible fade show my-2"
      role="alert"
    >
      <strong>Success!</strong> {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default SuccessAlert;
