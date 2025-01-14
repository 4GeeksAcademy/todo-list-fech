import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./lib/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

function App() {


  const [todos, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async(text) => {
    if (!text) return;
    const todoReference = collection(db, "todos");
    await addDoc(todoReference,{
      text:text,
      done:false,
    }).then((docRef) => {
      const newTodoList = [
        ...todos,
        { 
          id: docRef.id,
          text: text,
          done: false
         },
        ];
        setTodo(newTodoList)
    })
  
  };

  const deleteTodo = async(id) => {
    await deleteDoc(doc(db, "todos",id))
    const newTodoList = todos.filter((item) => item.id!==id);
    setTodo(newTodoList)
  }



useEffect(() => {
  const todoReference = collection(db,"todos");
  //console.log(dbreference);
  ///================================
  const getData = async() => {
    const data = await getDocs(todoReference);
    const todos = data.docs.map((doc) => ({
      id:doc.id,
      ...doc.data(),
    }));
    setTodo(todos);
  };
  getData()

},[]);


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
              value={item.text}
              onChange={(e) => {
                changeTodoState(item.id, e.target.checked);
              }}
            />
            <span className="todo-item-text">{item.text}</span>
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