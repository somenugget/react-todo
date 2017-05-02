// @flow
import React, { Component } from 'react'
import { Form, TextArea, Grid, Button } from 'semantic-ui-react'
import StatusButtons from './StatusButtons'
import Firebase from './Firebase'

class TaskForm extends Component {
  state: {
    status: string,
    title: string,
    description: ?string,
    titleError: boolean
  }

  handleStatusSelect: Function
  handleFormSubmit: Function
  handleTitleChange: Function
  handleDescriptionChange: Function
  validate: Function

  constructor(props: Object) {
    super(props)

    this.state = {
      status: 'todo',
      title: 'Watch standup',
      description: 'It is cool',
      titleError: false
    }

    this.handleStatusSelect = this.handleStatusSelect.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.validate = this.validate.bind(this)
  }

  handleStatusSelect(status: string) {
    this.setState({
      status: status
    })
  }

  handleFormSubmit(e: Object) {
    e.preventDefault()

    if (!this.validate()) {
      this.setState({
        titleError: true
      })
    } else {
      Firebase
        .createTask({
          title: this.state.title,
          description: this.state.description,
          status: this.state.status
        })
        .then((newtask) => this.props.onTaskAdded(newtask))
    }
  }

  handleTitleChange(e: Object) {
    this.setState({
      titleError: false,
      title: e.target.value
    })
  }

  handleDescriptionChange(e: Object) {
    this.setState({
      description: e.target.value
    })
  }

  validate(): boolean {
    return this.state.title.trim().length > 0
  }

  render() {
    return (
      <Form className='TaskForm' size='mini' error={this.state.titleError} onSubmit={this.handleFormSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form.Input placeholder='Title' fluid error={this.state.titleError} onChange={this.handleTitleChange}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <TextArea  placeholder='Description' autoHeight onChange={this.handleDescriptionChange}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <StatusButtons status={this.state.status} onStatusSelect={this.handleStatusSelect}/>
            </Grid.Column>
            <Grid.Column width={8}>
              <Button floated='right' size='mini' color='green'>Create</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    )
  }
}

export default TaskForm
