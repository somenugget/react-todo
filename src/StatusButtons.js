// @flow
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import Statuses from './constants/Statuses'

class StatusButtons extends Component {
  setStatus: Function

  constructor(props: Object) {
    super(props)

    this.setStatus = this.setStatus.bind(this)
  }

  statusButtons() {
    return Statuses
      .filter((status) => status.id !== 'done')
      .map((status) => (
        <Button
          key={status.id}
          value={status.id}
          active={status.id === this.props.status}>
          {status.title}
        </Button>
      ))
  }

  setStatus (e: Object) {
    e.preventDefault()
    this.props.onStatusSelect(e.target.value)
  }

  render () {
    return (
      <Button.Group className='StatusFilter' size='mini' onClick={this.setStatus}>
        {this.statusButtons()}
      </Button.Group>
    )
  }
}

export default StatusButtons
