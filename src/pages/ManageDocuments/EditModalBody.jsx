import React, { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUploads, updateUpload } from "../../redux/uploads/uploadsSlice";

const EditModalBody = ({
  closeEditModalHandler,
  selectedUpload,
}) => {
  const dispatch = useDispatch()
  const uploads = useSelector(fetchAllUploads);
  const value = uploads.find((upload) => upload.id === selectedUpload);
  const [description, setDescription] = useState(value.description);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const error = {};

    if (!description.trim()) {
      error.description = "File Description can't be empty";
    }

    setErrors(error);
    return error;
  };

  const formSubmit = (e) => {
    e.preventDefault();

    const uploadIndex = uploads.findIndex(
      (upload) => upload.id === selectedUpload
    );

    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      if (uploadIndex !== -1) {
        dispatch(updateUpload({description, uploadIndex}))

        // Close the modal
        closeEditModalHandler();
      }
    }
  };

  return (
    <form onSubmit={formSubmit} className="grid_form">
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="description"
        name="description"
        label="File Description"
        className={"inputs__wrapper"}
        error={errors.description}
      />
      <div className="modal_footer">
        <Button type="submit">Ok</Button>
        <Button onClick={closeEditModalHandler}>Cancel</Button>
      </div>
    </form>
  );
};

export default EditModalBody;
