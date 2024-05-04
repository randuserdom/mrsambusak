import { Navigate } from "react-router-dom";
export const GuestRequire = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to={"/chat"} />;
  } else {
    return children;
  }
};
