import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@fluentui/react";
import { Label } from "@fluentui/react/lib/Label";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import OpForm from "./OpForm";

const optionForm = [
  {
    id: "input-field",
    name: "Input Field",
  },
  {
    id: "date-picker",
    name: "Date Picker",
  },
  {
    id: "spin-button",
    name: "Spin Button",
  },
];

function InputCard(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [req, setReq] = useState(false);
  const [elements, setElements] = useState([]);
  const [options, setOption] = useState(optionForm);

  const checkValue = () => {
    if (title) {
      storeData();
    }
    setReq(true);
  };

  //method "storeCar"
  const storeData = async () => {
    //send data to server
    await axios.post("http://localhost:5000/api/task", {
      title: title,
      description: desc,
      options: elements,
    });

    props.onSubmit();
    props.onToggle();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    if (result.source.droppableId === "form-elements") {
      // Handle reordering elements within the form
      const newElements = Array.from(elements);
      const [movedElement] = newElements.splice(result.source.index, 1);
      newElements.splice(result.destination.index, 0, movedElement);

      setElements(newElements);
    } else if (result.source.droppableId === "add-element") {
      const addElement = {
        id: `form-${elements.length + 1}`,
        type: options[result.source.index].id,
        title: options[result.source.index].name,
      };

      const newElements = Array.from(elements);
      newElements.splice(result.destination.index, 0, addElement);

      setElements(newElements);
    }
  };
  const handleDeleteForm = (index) => {
    const newElements = Array.from(elements);
    newElements.splice(index, 1);

    setElements(newElements);
  };

  const handleChange = (index, change) => {
    const newElements = Array.from(elements);
    newElements[index] = change;

    setElements(newElements);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
              <Droppable droppableId="form-elements" direction="vertical">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="rounded-lg p-2 border-black border-2 min-h-[50px]"
                  >
                    {elements.map((element, index) => (
                      <Draggable
                        key={element.id}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="mb-3"
                            key={index}
                          >
                            <OpForm
                              index={index}
                              element={element}
                              onDelete={handleDeleteForm}
                              onChange={handleChange}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable
                droppableId="add-element"
                direction="horizontal"
                isDropDisabled={true}
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex justify-center my-6 gap-3"
                  >
                    {options.map((option, index) => (
                      <Draggable
                        key={option.id}
                        draggableId={option.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="bg-white border-2 border-black hover:bg-black hover:text-white px-4 py-2 rounded-md transition duration-300"
                          >
                            {option.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
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
      </DragDropContext>
    </>
  );
}

export default InputCard;
