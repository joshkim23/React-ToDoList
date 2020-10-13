import React, { useState } from "react";
import ToDoItem from "./ToDoItem";

let i = 0; //need to store this outside of the component function to iterate.

function ToDoList() {
  const [todos, changeTodos] = useState([]);

  const handleClick = (id, completed) => {
    let newToDos = todos.map((todo) => {
      //go through each object in the todos array
      if (todo.id === id) {
        //for each object, if the id matches the id that was clicked, return:
        return { ...todo, completed: !completed }; //the object thats a copy of the todos todo item, but completed property is flipped
      }
      return todo; //otherwise, return that object as is to the new array
    });
    changeTodos(newToDos); //set the state to the updated copy
  };

  const addToList = (e) => {
    if (e.charCode === 13) {
      // console.log("you clicked enter. your input: " + e.target.value);
      let newToDos = [...todos]; //NEED TO CREATE A NEW ARRAY COMPLETELY, NOT A REFERENCE TO THE STATE BC THEN THEY'RE DEPENDENT ON EACH OTHER! CAN'T DO NEWTODOS = TODOS! NEED TO DO NEWTODOS = [...TODOS] WHICH CREATES A NEW ARRAY THATS A COPY OF THE OLD ONE
      newToDos.push({ todo: e.target.value, id: i, completed: false }); //CANNOT PUT THIS InSIDE THE CHANGETODOS FUNCTION.
      changeTodos(newToDos);
      i++;
      e.target.value = "";
      // console.log(newToDos);
    }
  };

  const removeFromList = (id) => {
    // given the id, splice the array by removing the object that was selected, return a modified array with the id numbers updated. \
    let newToDos = [...todos];
    newToDos.splice(id, 1);

    const todosUpdatedIds = newToDos.map((item) => {
      if (item.id > id) {
        return { ...item, id: item.id - 1 };
      }
      return item;
    });
    changeTodos(todosUpdatedIds);
  };

  return (
    <div className="toDoList">
      <input
        type="text"
        placeholder="what do you need to do"
        onKeyPress={addToList}
      />
      {todos.map((item) => (
        <ToDoItem
          key={item.id}
          id={item.id}
          text={item.todo}
          handleClick={handleClick}
          completed={item.completed}
          remove={removeFromList}
        />
      ))}
    </div>
  );
}

export default ToDoList;
