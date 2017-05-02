// @flow
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import type { StatusObject } from './types/StatusObject'

class StatusFilter extends Component {
  props: {
    statuses: Array<StatusObject>,
    status: string,
    statusChange: Function
  }

  statusButtons: Function
  statusChange: Function

  constructor(props: Object) {
    super(props)

    this.statusButtons = this.statusButtons.bind(this)
    this.statusChange = this.statusChange.bind(this)
  }

  statusChange(e: Object) {
    if (this.props.status !== e.target.value) {
      this.props.statusChange(e.target.value)
    } else {
      this.props.statusChange(null)
      e.target.blur()
    }
  }

  statusButtons() {
    return this.props.statuses.map((status) => (
      <Button
        key={status.id}
        value={status.id}
        onClick={this.statusChange}
        active={status.id === this.props.status}>
        {status.title}
      </Button>
    ))
  }

  render() {
    return (
      <Button.Group className='StatusFilter'>
        {this.statusButtons()}
      </Button.Group>
    )
  }
}

export default StatusFilter
