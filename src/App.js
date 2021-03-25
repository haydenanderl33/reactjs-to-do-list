import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([
    { text: "Make lunch", isCompleted: false },
    { text: "Go to the gym", isCompleted: false },
    { text: "Clean the house", isCompleted: false },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    if (newTodos[index].isCompleted === false) {
      newTodos[index].isCompleted = true;
    } else {
      newTodos[index].isCompleted = false;
    }
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };





  const editTodo = (index) => {
    const newTodos = [...todos];
    const todo = newTodos[index];
    let newItem = prompt(todo.text,todo.text)
    let todoObj = { text: newItem, isCompleted: false };
    newTodos.splice(index, 1, todoObj);

    if(newItem === null || newItem === "null" || newItem === ""){
      return;
    } else {
    todo.text = newItem
    }

    setTodos(newTodos);
  };

  return (
    <div className="app">
      <header>ReactJS To-do List</header>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        <Todo
          key={index}
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default App;

const Todo = ({ todo, completeTodo, index, removeTodo, editTodo }) => {
  return (
    <div className="todoContainer" >
      <div
        className="todo"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        {todo.text}
      </div>
      <div className="btnCont">
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => editTodo(index)}>Edit</button>
        <button onClick={() => removeTodo(index)}>X</button>
      </div>
    </div>
  );
};

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") return console.log("Please add something To-do");
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add To-do"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
};
