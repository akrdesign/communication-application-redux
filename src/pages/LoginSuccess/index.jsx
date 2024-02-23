import React from "react";

import styles from "./styles.module.scss";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../redux/users/usersSlice";

const LoginSuccess = () => {
  const loggedInUser = useSelector(selectLoggedInUser)
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Login successful</h2>
        <p>
          <b>Welcome ! </b>
          <span>{loggedInUser?.email}</span>
        </p>
      </div>
    </>
  );
};

export default LoginSuccess;
