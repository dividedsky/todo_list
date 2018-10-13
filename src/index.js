import React from "react";
import ReactDOM from "react-dom";
import { todoData } from "./todoData";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./styles.css";

// local storage - done
// save completed todos - done
// show completed todos on button press - done
// sub-items - main todo complete if all subs complete
// color changer - done
// no empty strings when adding todo - done
// clear completed - done
// login, display per-user todo list
// make it not look terrible
// toggle completed on completed list

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      completedTodos: [],
      newTodoText: "",
      color: "green",
      showCompleted: false
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

  toggleShowCompleted = e => {
    this.setState({ showCompleted: !this.state.showCompleted });
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
    if (localStorage.getItem("todoData")) {
      this.setState({
        todoList: JSON.parse(localStorage.getItem("todoData"))
      });
    } else {
      this.setState({ todoList: todoData });
    }

    if (localStorage.getItem("completed")) {
      this.setState({
        completedTodos: JSON.parse(localStorage.getItem("completed"))
      });
    }

    if (localStorage.getItem("color")) {
      this.setState({ color: localStorage.getItem("color") });
    }
  }

  componentWillUnmount() {
    localStorage.setItem(
      "completed",
      JSON.stringify(this.state.completedTodos)
    );
    localStorage.setItem("todoData", JSON.stringify(this.state.todoList));
  }

  componentDidUpdate() {
    if (
      JSON.stringify(this.state.todoList) !== localStorage.getItem("todoData")
    ) {
      localStorage.setItem("todoData", JSON.stringify(this.state.todoList));
    }

    if (
      JSON.stringify(this.state.completedTodos) !==
      localStorage.getItem("completed")
    ) {
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
    return (
      <div className="App">
        <h1>J's Fabulous Todo List</h1>

        <TodoList
          todos={
            this.state.showCompleted
              ? this.state.completedTodos
              : this.state.todoList
          }
          toggle={this.toggleCompleted}
          color={this.state.color}
        />

        <TodoForm
          newTodoText={this.state.newTodoText}
          updateText={this.updateText}
          addItem={this.addItem}
          clearCompleted={this.clearCompleted}
          changeColor={this.changeColor}
          toggleShowCompleted={this.toggleShowCompleted}
          showCompleted={this.state.showCompleted}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
