import React, { useState } from "react";
import axios from "axios";
import { Label } from "@fluentui/react/lib/Label";
import { TextField, asAsync } from "@fluentui/react";

function TaskCard({ id, value, onSubmit }) {
  const [edit, setEdit] = useState(false);
  const [edited, setEdited] = useState(value);
  const [req, setReq] = useState(false);

  const checkValue = () => {
    if (edited.title) {
      updateData();
    }
    setReq(true);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const updateData = async () => {
    await axios.put(`http://localhost:5000/api/task?id=${id}`, {
      ...edited,
    });

    onSubmit();
    handleEdit();
  };

  const deleteData = async () => {
    await axios.delete(`http://localhost:5000/api/task?id=${id}`);

    onSubmit();
  };

  return (
    <>
      <div className="bg-white rounded-lg p-3 border-black border-2 w-600 my-2">
        {!edit ? (
          <>
            <h2 className="text-lg font-semibold mb-2">{value.title}</h2>
            <p className="text-gray-600">{value.description}</p>
            <div className="flex mt-4">
              <button className="bg-white py-2 mr-3" onClick={handleEdit}>
                Edit
              </button>
              <button className="bg-white py-2" onClick={deleteData}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <Label required>Title</Label>
            <TextField
              value={edited.title}
              onChange={(e) => setEdited({ ...edited, title: e.target.value })}
            />
            {req ? <Label>This field must be filled in</Label> : <></>}

            <Label className="mt-2">Description (Optional)</Label>
            <TextField
              multiline
              autoAdjustHeight
              value={edited.description}
              onChange={(e) =>
                setEdited({ ...edited, description: e.target.value })
              }
            />
            <button className="bg-white py-2 mr-3" onClick={checkValue}>
              Save
            </button>
            <button className="bg-white py-2" onClick={handleEdit}>
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default TaskCard;
