import { redirect, Navigate } from "react-router-dom";
export const Require = ({ children, destination }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to={`/${destination}`} />;
  } else {
    return children;
  }
};
