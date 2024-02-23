import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";

import Header from "../../components/Header";
import Button from "../../components/common/Button";
import ModalComponent from "../../components/ModalComponent";

import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, selectLoggedInUser } from "../../redux/users/usersSlice";
import {
  addShareUpload,
  fetchAllUploads,
} from "../../redux/uploads/uploadsSlice";

const ModalBody = () => {
  return <h4>Are you sure?</h4>;
};

const DocumentShare = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(allUsers);
  const loggedInUser = useSelector(selectLoggedInUser);

  const [selectedUser, setSelectedUser] = useState("");
  const uploads = useSelector(fetchAllUploads);
  const upload = uploads.find((u) => u.id === id);
  const [removedUser, setRemovedUser] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!upload) {
      navigate("/*");
    }
  }, [upload, navigate]);

  const removeUserHandler = () => {
    const updatedUploads = uploads.map((u) => {
      if (u.id === id) {
        const updatedUpload = { ...u };
        updatedUpload.shared = updatedUpload?.shared.filter(
          (share) => share.id !== removedUser
        );
        return updatedUpload;
      }
      return u;
    });

    dispatch(addShareUpload(updatedUploads));
    setRemovedUser(null);
  };

  const openModalHandler = (id) => {
    setRemovedUser(id);
  };

  const closeModalHandler = () => {
    setRemovedUser(null);
  };

  const validation = () => {
    const error = {};

    if (selectedUser.trim() === "") {
      error.selectedUser = "Please select at least one user!!";
    }

    setErrors(error);
    return error;
  };

  const addShareHandler = () => {
    const formErrors = validation();

    if (Object.keys(formErrors).length === 0) {
      const [selectedFullName, selectedEmail] = selectedUser.split(",");

      const isUserAlreadyShared = upload?.shared.some(
        (share) => share.user === selectedFullName
      );

      if (isUserAlreadyShared) {
        const error = {
          selectedUser: "File already shared with this user!",
        };
        setErrors(error);
      } else {
        const updatedUploads = uploads.map((u) => {
          if (u.id === id) {
            const updatedUpload = { ...u };
            updatedUpload.shared = [
              ...updatedUpload.shared,
              {
                id: uuidv4(),
                user: selectedFullName,
                sharedBy: loggedInUser.email,
                sharedTo: selectedEmail,
                description: upload.description,
                file: upload.file,
              },
            ];
            return updatedUpload;
          }
          return u;
        });

        dispatch(addShareUpload(updatedUploads));
        setSelectedUser("");
        setErrors({});
      }
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Upload sharing: {upload.description}</h2>
        {upload?.shared && upload?.shared.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Shared user</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {upload?.shared.map((share) => {
                return (
                  <tr key={share.id}>
                    <td>{share.user}</td>
                    <td>
                      <span
                        className={styles.button}
                        onClick={() => openModalHandler(share.id)}
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h5 className="mt-3">This file is not shared with any user</h5>
        )}
        <h2 className="mt-5">Add Sharing</h2>
        <div className={`${styles.add_share} mt-3`}>
          <h2>Choose user : </h2>
          <div className={styles.dropdown}>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setSelectedUser(e.target.value)}
              value={selectedUser}
              className="text-capitalize"
            >
              <option value="">Select User</option>
              {users.map((user) => {
                // Filter out loggedInUser from dropdown options
                if (user.email !== loggedInUser.email) {
                  return (
                    <option
                      key={user.id}
                      value={`${user.fullName},${user.email}`}
                      className="text-capitalize"
                    >
                      {user.fullName}
                    </option>
                  );
                }
                return null;
              })}
            </Form.Select>
            {errors && <p style={{ color: "red" }}>{errors.selectedUser}</p>}
          </div>
          <Button onClick={addShareHandler}>Add share</Button>
        </div>
      </div>
      {removedUser && (
        <ModalComponent
          confirmHandler={removeUserHandler}
          handleClose={closeModalHandler}
          heading="Confirm user deletion?"
          ModalBody={() => <ModalBody />}
          footerVisible={true}
        />
      )}
    </>
  );
};

export default DocumentShare;
