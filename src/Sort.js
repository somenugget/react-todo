// @flow
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'


class Sort extends Component {
  props: {
    sort: ?string,
    sortChange: Function
  }

  undoneFirstChange: Function

  constructor(props: Object) {
    super(props)

    this.undoneFirstChange = this.undoneFirstChange.bind(this)
  }

  undoneFirstChange(e: Object) {
    if (this.isUndoneFirst()) {
      this.props.sortChange(null)
      e.currentTarget.blur()
    } else {
      this.props.sortChange('undone')
    }
  }

  isUndoneFirst(): boolean {
    return this.props.sort === 'undone'
  }

  render() {
    return (
      <Button floated='right' active={this.isUndoneFirst()} onClick={this.undoneFirstChange}>
        <nobr>Undone first</nobr>
      </Button>
    )
  }
}

export default Sort
