import React from "react";
import styled from "styled-components";

const MyForm = styled.form`
  border: 1px solid black;
background-color: gray;
height: 200px;
display: flex;
flex-direction: column;
align-items: center;
`;

const MyInput = styled.input`
width: 40%;
padding: 10px;
border-radius: 20px;
margin: 16px

`;
const MyButton = styled.button`
  color: green
border-radius: 10px;
padding: 10px 5px;
font-size: 16px;
margin: 10px 0 20px;

&:hover {
background: green;
color: white;
}
`;

const TodoForm = props => {
  return (
    <MyForm onSubmit={props.addItem}>
      <MyInput
        type="text"
        placeholder="Add a task"
        value={props.newTodoText}
        onChange={props.updateText}
      />
      <MyButton onClick={props.clearCompleted}>Clear Completed</MyButton>
      <label for="colorSelect">Change background color</label>
      <input name="colorSelect" type="color" onChange={props.changeColor} />
    </MyForm>
  );
};

export default TodoForm;