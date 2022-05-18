import React from "react";

function Spinner({ type = "border", colorClass = "light", title = "Loading..." }) {
  return (
    <div
      className={`spinner-${type} text-${colorClass}`}
      role="status"
      style={{
        marginBottom: 2,
        width: "0.9rem",
        height: "0.9rem",
      }}
    >
      <span className="sr-only">{title}</span>
    </div>
  );
}

export default Spinner;
