import React from "react";

function PasswordCheckList({ data }) {
  const label = data[0];
  const meetsReq = data[1];

  return (
    <ul className="must-item">
      <li className="must-text">
        {meetsReq ? (
          <del className="text-success">
            <span className="text-muted">{label}</span>
          </del>
        ) : (
          label
        )}
      </li>
    </ul>
  );
}

export default PasswordCheckList;
