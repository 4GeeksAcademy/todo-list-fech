import { useState } from "react";
import "./App.css";

function App() {
 const [todos, setTodo] = useState([
    { 
      id: 1,
      task: "to do on Monday",
      done: false 
    },
  ]);

 
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (task) => {
    const newTodoList = [
      ...todos,
      { 
        id: todos.length + 1,
        task: task,
        done: false
       },
    ];

    setTodo(newTodoList)
  };

  const deleteTodo = (id) => {
    const newTodoList = todos.filter((item) => item.id!=id);
    setTodo(newTodoList)
  }

  const changeTodoState = (id, state) => {
    const newTodoList = todos.map((item) => {
      if (item.id === id) {
        return { ...item, done: state };
      } else {
        return item;
      }
    });

    setTodo(newTodoList);
  };

  return (
    <div className="container">
      <h1>
      {"<"} My To do list {">"}
      </h1>

      <div className="new-todo-container">
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Add new todo"
          style={{width: 300}}
        />
       
        <button
          onClick={() => {
            addTodo(newTodo);
            setNewTodo("");
          }} className="btn"
        >
          ➕ 
        </button>
      </div>
       
      <ul className="todo-list">
        {todos.map((item) => {
          return (
            <li key={item.id} className={`todo-item ${item.done?"done" : ""}`}>
            <input
              type="checkbox"
              value={item.done}
              onChange={(e) => {
                changeTodoState(item.id, e.target.checked);
              }}
            />
            <span className="todo-item-text">{item.task}</span>
            <button onClick={() => deleteTodo(item.id)} className="delete">
              ❌
            </button>
          </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;