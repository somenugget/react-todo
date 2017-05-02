// @flow
import React, { Component } from 'react'
import { Item, Checkbox, Label } from 'semantic-ui-react'
import type { TaskObject } from './types/TaskObject'
import Statuses from './constants/Statuses'
import type { StatusObject } from './types/StatusObject'
import Firebase from './Firebase'

class Task extends Component {
  props: {
    task: TaskObject,
    onTaskCompletion: Function
  }

  handleСompletion: Function

  constructor(props: Object) {
    super(props)

    this.handleСompletion = this.handleСompletion.bind(this)
  }

  isDone() {
    return this.props.task.status === 'done'
  }

  isImportant(): boolean {
    return this.props.task.status === 'important'
  }

  taskStatus(): ?StatusObject {
    return Statuses.find((status) => this.props.task.status === status.id)
  }

  handleСompletion() {
    if (!this.isDone()) {
      Firebase.setDone(this.props.task.id)
      this.props.onTaskCompletion(this.props.task.id)
    }
  }

  render() {
    const status = this.taskStatus()

    let doneCheckbox = (<div className='right floated'><Checkbox checked={this.isDone()} onChange={this.handleСompletion}/></div>)
    let DoneClass = ''
    let StatusLabel = null

    if (this.isDone()) {
      DoneClass = 'ui grey'
    }

    if (status) {
      StatusLabel = (
        <Item.Extra>
          <Label color={status.color} size='tiny'>{status.title}</Label>
        </Item.Extra>
      )
    }

    return (
      <Item>
        <Item.Content>
          <Item.Header className={DoneClass}>{this.props.task.title}</Item.Header>
          {doneCheckbox}
          <Item.Description>{this.props.task.description}</Item.Description>
          {StatusLabel}
        </Item.Content>
      </Item>
    )
  }
}

export default Task
