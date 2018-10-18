import React from 'react'
import Todo from './todo-list'
import TodoForm from './todo-form'
import { Container, Row, Col } from 'reactstrap'
 const styles = {
  app: {
    width: '26rem',
    maxWidth: '100%'
  }
}
 export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
  }
  addTodo(newTodo) {
    const todo = Object.assign({}, newTodo)
    const task = todo.task
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const myInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        task,
        isCompleted: false
      })
    }
    fetch('/todos', myInit)
      .then(res => res.json())
      .then(todo => this.setState({
        todos: [...this.state.todos, todo]
      }))
  }
  deleteTodo(todoId) {
    const todoIndex = this.state.todos.findIndex(todo => todo.id === todoId)
    const todos = [
      ...this.state.todos.slice(0, todoIndex),
      ...this.state.todos.slice(todoIndex + 1)
    ]
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application-/json')
    const myInit = {
      method: 'DELETE',
      headers: myHeaders
    }
    fetch(`/todos/${todoId}`, myInit)
      .then(res => res.json())
      .then(() => this.setState({
        todos: todos
      }))
  }
  toggleCompleted(todoId) {
    const todos = this.state.todos.map(todo =>
      todo.id === todoId
        ? Object.assign({}, todo, { isCompleted: !todo.isCompleted })
        : todo
    )
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const myInit = {
      method: 'PATCH',
      headers: myHeaders
    }
    fetch(`/todos/${todoId}`, myInit)
      .then(res => res.json())
      .then(() => this.setState({
        todos: todos
      }))
  }
  componentDidMount() {
    fetch('/todos')
      .then(res => res.json())
      .then((list) => {
        this.setState({
          todos: list
        })
      })
  }
  render() {
    const { todos } = this.state
    return (
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <div style={styles.app}>
              <h1 className="text-center mb-4">Todo List</h1>
              <TodoForm onSubmit={this.addTodo}/>
              <Todo
                todos={todos}
                toggleCompleted={this.toggleCompleted}
                deleteTodo={this.deleteTodo} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
