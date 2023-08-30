import React, { useCallback, useEffect, useState } from "react";
import { TextField } from "@fluentui/react";
import { Label } from "@fluentui/react/lib/Label";
import { DatePicker } from "@fluentui/react";
import { SpinButton } from "@fluentui/react";
import { BiTrashAlt, BiEditAlt, BiSave } from "react-icons/bi";

function OpFormList({ index, element, onDelete, onChange }) {
  const [isEdit, setIsEdit] = useState(false);
  const [edited, setEdited] = useState(element);
  const [spinValue, setSpinValue] = useState(0);

  useEffect(() => {
    onChange(index, edited);
  }, [edited]);

  const handleDelete = () => {
    onDelete(index);
  };

  const handleEditButton = () => {
    setIsEdit(!isEdit);
  };

  const onSpinButtonChange = useCallback((event, newValue) => {
    if (newValue != undefined) {
      setEdited({ ...edited, value: newValue });
      setSpinValue(newValue);
    }
  });

  const handleEditChange = (value) => {
    setEdited({ ...edited, value: value });
  };
  return (
    <>
      <div className="flex bg-white">
        {!isEdit ? (
          <>
            <div className="flex-1">
              <Label className="mb-1">
                {edited.title}{" "}
                <button className="bg-white">
                  <BiEditAlt onClick={handleEditButton} />
                </button>
              </Label>
            </div>
            <div className="ml-auto">
              <button className="bg-white" onClick={handleDelete}>
                <BiTrashAlt />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                className="my-2 w-4/3"
                value={edited.title}
                onChange={(e) =>
                  setEdited({ ...edited, title: e.target.value })
                }
              />
              <button className="bg-white">
                <BiSave onClick={handleEditButton} />
              </button>
            </div>
          </>
        )}
      </div>

      {element.type == "input-field" ? (
        <TextField onChange={(e) => handleEditChange(e.target.value)} />
      ) : (
        <></>
      )}
      {element.type == "date-picker" ? (
        <DatePicker onSelectDate={(date) => handleEditChange(date)} />
      ) : (
        <></>
      )}
      {element.type == "spin-button" ? (
        <SpinButton
          label="Pilih nilai"
          value={spinValue}
          min={0}
          max={100}
          step={1}
          incrementButtonAriaLabel="Increase value by 1"
          decrementButtonAriaLabel="Decrease value by 1"
          onChange={onSpinButtonChange}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default OpFormList;
