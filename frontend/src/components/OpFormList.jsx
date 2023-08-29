import React from "react";
import { TextField } from "@fluentui/react";
import { Label } from "@fluentui/react/lib/Label";
import { Droppable, Draggable } from "react-beautiful-dnd";

function OpFormList({ forms }) {
  return (
    <Droppable droppableId="form-list" direction="vertical">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {forms.map((form, index) => (
            <Draggable key={form.id} draggableId={form.id} index={index}>
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  className="form-item"
                >
                  <div className="my-2">
                    <Label>{form.id}</Label>
                    <TextField />
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default OpFormList;
