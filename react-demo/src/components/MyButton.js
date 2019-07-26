import React, { PureComponent } from 'react'

export default class MyButton extends PureComponent {
  render() {
    return (
      <button>Hello {this.props.children} !</button>
    )
  }
}
