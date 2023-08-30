import React, { useEffect, useState } from "react";
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

function OpFormList({ value, onChange }) {
  const [elements, setElements] = useState(value);
  const [options, setOption] = useState(optionForm);

  useEffect(() => {
    onChange(elements);
  }, [elements]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    if (result.source.droppableId === "form-elements") {
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
      </DragDropContext>
    </>
  );
}

export default OpFormList;
