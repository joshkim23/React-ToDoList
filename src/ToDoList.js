import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";

let i = 0; //need to store this outside of the component function to iterate. in general you don't want to update the id of a component after it is given.

function ToDoList() {
  const [todos, changeTodos] = useState([] || initialTodos);

  useEffect(() => {
    window.localStorage.setItem(todos, JSON.stringify(todos)); //sets
    const initialTodos = JSON.parse(window.localStorage.getItem(todos));
  }, [todos]); //only rerenders if [todos] changes!

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
    // given the id, filter through copy of old state, and return all the elements that do NOT have the matching id and return that new array. This effectively deletes the element with the id that is passed into this function. Want to keep every object's id immutable once assigned, also doing it this way is preferred over using the array index to map to the id since the array is growing and shrinking dynamically at different places!

    let newToDos = [...todos];

    const todosUpdatedIds = newToDos.filter((item) => item.id !== id); //similar to .map, but returns values to a new array where the callback function returns true.
    changeTodos(todosUpdatedIds);
    console.log(todosUpdatedIds);
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
