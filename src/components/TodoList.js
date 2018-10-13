import React from "react";
import styled, { css } from "styled-components";

const StyledTodoListContainer = styled.div`
  width: 800px;
  height: 200px;
  border: 1px solid gray;
  margin: 20px auto 0;
  background-color: lightblue;

  ${props =>
    props.color &&
    css`
      background-color: ${props.color};
    `};
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 30px;
  font-size: 20px;
`;

const StyledTodo = styled.li`
  text-align: left;

  ${props =>
    props.completed &&
    css`
      text-decoration: line-through;
      color: red;
    `};
`;

// <ul>{props.todos.map(todo => <li>{todo}</li>)}</ul>
const TodoList = props => {
  return (
    <StyledTodoListContainer color={props.color}>
      <StyledList>
        {props.todos.map(todo => (
          <StyledTodo
            key={todo.id}
            id={todo.id}
            onClick={props.toggle}
            completed={todo.completed}
          >
            {todo.task}
          </StyledTodo>
        ))}
      </StyledList>
    </StyledTodoListContainer>
  );
};

export default TodoList;
