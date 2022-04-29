import React from "react";

function Permission({ children, required }) {
  const user = {
    name: "Lima",
    permissions: ["view_user", "edit_user"],
  };

  const { permissions } = user;

  //return (permissions.some((permission) => required.indexOf(permission) >= 0) && <>{children}</>);
  //return permissions.some(r => required.includes(r))
  return permissions.some((permission) => required.indexOf(permission) >= 0) ? (
    children
  ) : (
    <span className="d-block text-danger">Você não tem permissão</span>
  );
}

export default Permission;
