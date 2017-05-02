// @flow
import React, {Component} from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import type { TaskObject } from './types/TaskObject'
import TasksFilter from './TasksFilter'
import TasksList from './TasksList'
import Firebase from './Firebase'
import TaskForm from './TaskForm'

class App extends Component {
  state: {
    tasks: Array<TaskObject>,
    filterText: string,
    status: ?string,
    sort: ?string
  }

  handleFilterTextChange: Function
  handleStatusChange: Function
  handleSortChange: Function
  handleTaskCreation: Function
  handleTaskCompletion: Function

  constructor(props: Object) {
    super(props)

    this.state = {
      tasks: [],
      filterText: '',
      status: null,
      sort: 'undone'
    }

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handleTaskCreation = this.handleTaskCreation.bind(this)
    this.handleTaskCompletion = this.handleTaskCompletion.bind(this)

    Firebase.allTasks((tasks) =>
      this.setState({
        tasks: tasks
      })
    )
  }

  handleFilterTextChange(filterText: string) {
    this.setState({
      filterText: filterText
    })
  }

  handleStatusChange(status: string) {
    this.setState({
      status: status
    })
  }

  handleSortChange(sort: string) {
    this.setState({
      sort: sort
    })
  }

  handleTaskCreation(taks: TaskObject) {
    this.setState({
      tasks: this.state.tasks.concat([taks])
    })
  }

  handleTaskCompletion(taskId: string) {
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if (task.id === taskId) {
          task.status = 'done'
        }

        return task
      })
    })
  }

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Divider hidden />
            <TasksFilter
              onFilterTextChange={this.handleFilterTextChange}
              onStatusChange={this.handleStatusChange}
              onSortChange={this.handleSortChange}
              status={this.state.status}
              sort={this.state.sort}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Divider hidden />
            <TaskForm onTaskAdded={this.handleTaskCreation}/>
            <Divider hidden />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TasksList
              filterText={this.state.filterText}
              status={this.state.status}
              tasks={this.state.tasks}
              onTaskCompletion={this.handleTaskCompletion}
              sort={this.state.sort}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
