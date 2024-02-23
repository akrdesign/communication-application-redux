import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/users/usersSlice";

// Navigation Menu Data
const navigation = [
  {
    title: "group chats",
    link: "/",
  },
  {
    title: "manage users",
    link: "/manage-users",
  },
  {
    title: "manage documents",
    link: "/manage-documents",
  },
  {
    title: "logout",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  // Logout handler
  const handleLogoutClick = () => {
    dispatch(logout())
    
    // navigate("/welcome")
  };

  return (
    <header className={styles.container}>
      <ul>
        {navigation.map((nav, index) => {
          if (nav.title === "logout") {
            return (
              <li key={index} onClick={handleLogoutClick}>
                {nav.title}
              </li>
            );
          }
          return (
            <li key={index}>
              <NavLink to={nav?.link}>{nav.title}</NavLink>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
