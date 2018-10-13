import React from "react";
import styled from "styled-components";

const MyForm = styled.form`
  border: 1px solid black;
  background-color: gray;
width: 800px
  display: flex;
  flex-direction: column;
  align-items: center;
border-radius: 0 0 10px 10px;
margin: 0 auto;
`;

const MyInput = styled.input`
  width: 40%;
  padding: 10px;
  border-radius: 20px;
  margin: 16px;
`;
const MyButton = styled.button`
  color: green
border-radius: 10px;
border: 1px solid black;
padding: 20px 10px;
vertical-align: center;
font-size: 16px;
margin: 10px 0;
width: 200px;

&:hover {
background: green;
color: white;
}
`;

const TodoForm = props => {
  let btnText;
  if (props.showCompleted) {
    btnText = "Show Tasks";
  } else {
    btnText = "Show Completed";
  }
  return (
    <MyForm onSubmit={props.addItem}>
      <MyInput
        type="text"
        placeholder="Add a task"
        value={props.newTodoText}
        onChange={props.updateText}
      />
      <MyButton onClick={props.clearCompleted}>Clear Completed</MyButton>
      <MyButton onClick={props.toggleShowCompleted}>{btnText}</MyButton>
      <label for="colorSelect">Change background color</label>
      <input name="colorSelect" type="color" onChange={props.changeColor} />
    </MyForm>
  );
};

export default TodoForm;
