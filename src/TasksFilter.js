// @flow
import React, { Component } from 'react'
import { Input, Grid } from 'semantic-ui-react'
import StatusFilter from './StatusFilter'
import Sort from './Sort'
import Statuses from './constants/Statuses'

class TasksFilter extends Component {
  filterTextChange: Function
  statusChange: Function
  sortChange: Function

  constructor(props: Object) {
    super(props)

    this.filterTextChange = this.filterTextChange.bind(this)
    this.statusChange = this.statusChange.bind(this)
    this.sortChange = this.sortChange.bind(this)
  }

  filterTextChange(e: Object) {
    this.props.onFilterTextChange(e.target.value)
  }

  statusChange(status: string) {
    this.props.onStatusChange(status)
  }

  sortChange(sort: string) {
    this.props.onSortChange(sort)
  }

  render() {
    return (
      <section className='TasksFilter'>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Input fluid icon='search' onChange={this.filterTextChange}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated='left' width='10'>
              <StatusFilter statuses={Statuses} statusChange={this.statusChange} status={this.props.status} />
            </Grid.Column>
            <Grid.Column floated='right' width='6'>
              <Sort sortChange={this.sortChange} sort={this.props.sort}></Sort>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    )
  }
}

export default TasksFilter
