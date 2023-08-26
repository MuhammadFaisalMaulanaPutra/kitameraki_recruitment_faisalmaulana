import React, { useState } from "react";
import { TextField } from "@fluentui/react";
import axios from "axios";

function InputCard(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  //method "storeCar"
  const storeData = async () => {
    //send data to server
    await axios.post("http://localhost:5000/api/task", {
      title: title,
      description: desc,
    });

    props.onSubmit();
    props.onToggle();
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="flex-col w-600">
          <div className="bg-white rounded-lg p-3 border-black border-2 ">
            <TextField
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="description"
              multiline
              autoAdjustHeight
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="flex mt-4">
              <button className="bg-white py-2 me-4" onClick={storeData}>
                Save
              </button>
              <button className="bg-white py-2" onClick={props.onToggle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputCard;
