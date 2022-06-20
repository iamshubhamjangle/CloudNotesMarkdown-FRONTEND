import React from "react";

function ErrorAlert({ children }) {
  return (
    <div
      className="alert alert-danger alert-dismissible fade show my-2"
      role="alert"
    >
      <strong>Error!</strong> {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default ErrorAlert;
