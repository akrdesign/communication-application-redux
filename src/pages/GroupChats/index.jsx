import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "../../components/Header";

import styles from "./styles.module.scss";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, selectLoggedInUser } from "../../redux/users/usersSlice";
import { addChat, fetchAllChats } from "../../redux/chats/chatsSlice";

const GroupChats = () => {
  const dispatch = useDispatch();
  const chats = useSelector(fetchAllChats);
  const loggedInUser = useSelector(selectLoggedInUser);
  const users = useSelector(allUsers);
  const [message, setMessage] = useState("");

  const currentUser = users.find((u) => u.id === loggedInUser.id);

  const submitHandler = (e) => {
    e.preventDefault();

    // Get Current Date and Time
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    if (message.trim() !== "") {
      const chat = {
        id: uuidv4(),
        date: currentDateTime,
        user: currentUser.fullName,
        message: message,
      };
      dispatch(addChat(chat));
      setMessage("");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Group chat</h2>

        <ul className={styles.chat_container}>
          {chats.length > 0 &&
            chats.map((chat) => (
              <li key={chat.id}>
                <span>[{chat.date}] </span>
                <span>{chat.user} : </span>
                <span>{chat.message}</span>
              </li>
            ))}
        </ul>

        <form onSubmit={submitHandler} className={styles.input_wrapper}>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            name="message"
            label={currentUser.fullName}
            className={styles.input}
            autoComplete="off"
          />
          <div className={styles.button_wrapper}>
            <Button type="submit">Send</Button>
            <Button>Refresh</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GroupChats;
