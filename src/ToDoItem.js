import React from "react";

export default function ({ id, text, handleClick, completed, remove }) {
  console.log("hi");
  const toggleCompleted = () => handleClick(id, completed);
  const deleteItem = () => remove(id);

  return (
    <div className="ToDoItem">
      <div
        className="ToDoItemTextOnly"
        onClick={toggleCompleted}
        // textDecoration={completed ? "line-through" : "none"}
        style={
          completed
            ? { textDecoration: "line-through", color: "gray" }
            : { textDecoration: "none" }
        }
      >
        {text}
      </div>
      <button onClick={deleteItem}>X</button>
    </div>
  );
}
