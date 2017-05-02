// @flow
import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import type { TaskObject } from './types/TaskObject'
import Task from './Task'

class TasksList extends Component {
  props: {
    tasks: Array<TaskObject>,
    filterText: string,
    status: ?string,
    sort: ?string,
    onTaskCompletion: Function
  }

  handleTaskCompletion: Function

  constructor(props: Object) {
    super(props)

    this.handleTaskCompletion = this.handleTaskCompletion.bind(this)
  }

  renderTasks() {
    let tasksToShow = []

    if (!this.props.tasks) {
      return null;
    }

    this.props.tasks.forEach((task) => {
      if (this.props.status && task.status !== this.props.status) {
        return;
      }

      if (task.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }

      tasksToShow.push(task)
    })

    if (this.props.sort) {
      if (this.props.sort === 'undone') {
        tasksToShow = this.sortUndoneFirst(tasksToShow)
      }
    }

    return tasksToShow.map((task) => (
      <Task task={task} key={task.id.toString()} onTaskCompletion={this.handleTaskCompletion}/>
    ))
  }

  sortUndoneFirst(tasks: Array<TaskObject>) {
    return tasks.sort((task) => {
      return task.status !== 'done' ? -1 : 1
    })
  }

  handleTaskCompletion(taskId: string) {
    this.props.onTaskCompletion(taskId)
  }

  render() {
    return (
      <Item.Group divided>
        {this.renderTasks()}
      </Item.Group>
    )
  }
}

export default TasksList
