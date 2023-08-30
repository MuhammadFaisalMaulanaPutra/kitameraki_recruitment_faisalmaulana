import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@fluentui/react";
import { Label } from "@fluentui/react/lib/Label";
import OpFormList from "./OpFormList";

function InputCard(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [req, setReq] = useState(false);
  const [elements, setElements] = useState([]);

  const checkValue = () => {
    if (title) {
      storeData();
    }
    setReq(true);
  };
  const storeData = async () => {
    await axios.post("http://localhost:5000/api/task", {
      title: title,
      description: desc,
      options: elements,
    });

    props.onSubmit();
    props.onToggle();
  };

  const handleChange = (value) => {
    setElements(value);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex-col w-600">
          <div className="bg-white rounded-lg p-3 border-black border-2 mb-10">
            <Label required>Title</Label>
            <TextField onChange={(e) => setTitle(e.target.value)} />
            {req ? <Label>This field must be filled in</Label> : <></>}

            <Label className="mt-2">Description (Optional)</Label>
            <TextField
              multiline
              autoAdjustHeight
              onChange={(e) => setDesc(e.target.value)}
            />

            <Label className="mt-2">Optional Form</Label>
            <OpFormList value={elements} onChange={handleChange} />
            <div className="flex mt-4">
              <button className="bg-white py-2 me-4" onClick={checkValue}>
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
