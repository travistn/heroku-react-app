import React from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
 export default class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { task: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    const { value } = event.target
    this.setState({ task: value })
  }
  handleSubmit(event) {
    event.preventDefault()
    const { task } = this.state
    this.props.onSubmit({ task })
    this.setState({ task: '' })
  }
  render() {
    const { task } = this.state
    const { handleChange, handleSubmit } = this
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <div className="input-group">
            <Input
              required
              autoFocus
              name="task"
              value={task}
              placeholder="New Todo"
              onChange={handleChange}
              className="form-control"/>
            <div className="input-group-append">
              <Button type="submit" color="primary">
                Add
              </Button>
            </div>
          </div>
        </FormGroup>
      </Form>
    )
  }
}
