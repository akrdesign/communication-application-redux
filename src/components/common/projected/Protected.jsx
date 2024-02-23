import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../../../redux/users/usersSlice";

const Protected = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  if (!loggedInUser) {
    return <Navigate to="/welcome" replace={true}></Navigate>;
  }

  return children;
};

export default Protected;
