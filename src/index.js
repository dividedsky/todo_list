import React from "react";
import ReactDOM from "react-dom";
import { todoData } from "./todoData";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./styles.css";

// todolist
// todo
// todo form

// local storage - done
// save completed todos - done
// show completed todos on button press
// sub-items - main todo complete if all subs complete
// color changer
// no empty strings when adding todo - done
// clear completed - done
// login, display per-user todo list

class App extends React.Component {
  constructor() {
    super();
    console.log("constructor running");
    this.state = {
      todoList: [],
      completedTodos: [],
      newTodoText: "",
      color: "green"
    };
  }

  updateText = e => {
    this.setState({ newTodoText: e.target.value });
  };

  addItem = e => {
    e.preventDefault();
    if (this.state.newTodoText) {
      this.setState(prevState => {
        return {
          todoList: [
            ...prevState.todoList,
            {
              task: this.state.newTodoText,
              id: Date.now(),
              completed: false
            }
          ]
        };
      });
      this.setState({ newTodoText: "" });
    }
  };

  toggleCompleted = e => {
    e.persist();
    const newTodoList = this.state.todoList.map(t => {
      if (t.id === parseInt(e.target.id, 10)) {
        return { ...t, completed: !t.completed };
      } else {
        return t;
      }
    });
    this.setState({ todoList: newTodoList });
  };

  clearCompleted = e => {
    console.log("click");
    const newCompletedArr = this.state.completedTodos;
    this.state.todoList.forEach(t => {
      if (t.completed) {
        newCompletedArr.push(t);
      }
    });
    const newTodoArr = this.state.todoList.filter(t => t.completed === false);
    this.setState({ todoList: newTodoArr, completedTodos: newCompletedArr });
  };

  changeColor = e => {
    this.setState({ color: e.target.value });
  };

  componentDidMount() {
    console.log("Component Did Mount Starting");
    console.log(localStorage.getItem("completed"));
    if (localStorage.getItem("todoData")) {
      this.setState({
        todoList: JSON.parse(localStorage.getItem("todoData"))
      });
    } else {
      this.setState({ todoList: todoData });
    }

    if (localStorage.getItem("completed")) {
      console.log("loading completed: ", localStorage.getItem("completed"));
      this.setState({
        completedTodos: JSON.parse(localStorage.getItem("completed"))
      });
    }

    if (localStorage.getItem("color")) {
      this.setState({ color: localStorage.getItem("color") });
    }
    console.log("component did mount completed");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount");
    localStorage.setItem(
      "completed",
      JSON.stringify(this.state.completedTodos)
    );
    localStorage.setItem("todoData", JSON.stringify(this.state.todoList));
  }

  componentDidUpdate() {
    console.log("Component Did Update");
    if (
      JSON.stringify(this.state.todoList) !== localStorage.getItem("todoData")
    ) {
      console.log("CDU");
      localStorage.setItem("todoData", JSON.stringify(this.state.todoList));
    }

    if (
      JSON.stringify(this.state.completedTodos) !==
      localStorage.getItem("completed")
    ) {
      console.log("update completed");
      console.log("local storage:", localStorage.getItem("completed"));
      localStorage.setItem(
        "completed",
        JSON.stringify(this.state.completedTodos)
      );
    }

    if (this.state.color != localStorage.getItem("color")) {
      localStorage.setItem("color", this.state.color);
    }
  }

  render() {
    console.log("Render is running");
    return (
      <div className="App">
        <h1>Justin's Fabulous Todo List</h1>

        <TodoList
          todos={this.state.todoList}
          toggle={this.toggleCompleted}
          color={this.state.color}
        />

        <TodoForm
          newTodoText={this.state.newTodoText}
          updateText={this.updateText}
          addItem={this.addItem}
          clearCompleted={this.clearCompleted}
          changeColor={this.changeColor}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);