import React from 'react'
import { ListGroup, ListGroupItem, Input, FormGroup } from 'reactstrap'

const styles = {
  deleteIcon: {
    cursor: 'pointer',
    fontSize: '1.5rem'
  },
  pendingTodo: {
    textDecoration: 'none'
  },
  completedTodo: {
    textDecoration: 'line-through'
  }
}

function TodoItem({ todo, onCompletedChange, onDeleteClicked }) {
  const labelClass = todo.isCompleted
    ? 'form-check-label text-muted'
    : 'form-check-label'
  const labelStyle = todo.isCompleted
    ? styles.completedTodo
    : styles.pendingTodo
  return (
    <ListGroupItem>
      <FormGroup className="form-check clearfix">
        <Input
          type="checkbox"
          id={`todo-${todo.id}`}
          checked={todo.isCompleted}
          className="form-check-input"
          onChange={onCompletedChange}/>
        <label
          style={labelStyle}
          className={labelClass}
          htmlFor={`todo-${todo.id}`}>
          { todo.task }
        </label>
        { todo.isCompleted &&
          <i
            style={styles.deleteIcon}
            onClick={onDeleteClicked}
            className="fa fa-times text-danger float-right"/>
        }
      </FormGroup>
    </ListGroupItem>
  )
}
 export default class Todo extends React.Component {
  render() {
    return (
      <ListGroup>
        {
          this.props.todos.map(todo =>
            <TodoItem
              todo={todo}
              key={todo.id}
              onDeleteClicked={() => this.props.deleteTodo(todo.id)}
              onCompletedChange={() => this.props.toggleCompleted(todo.id)}/>
          )
        }
      </ListGroup>
    )
  }
}
