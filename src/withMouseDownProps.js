import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default mouseDownProps => Target => {
  class WithMouseDownProps extends Component {
    constructor() {
      super()

      this.state = {
        mouseDown: false,
      }
    }

    render() {
      const { onMouseDown, onMouseUp, ...props } = this.props
      const { mouseDown } = this.state

      return (
        <Target
          onMouseDown={(...args) => {
            this.setState({ mouseDown: true })
            onMouseDown && onMouseDown(...args)
          }}
          onMouseUp={(...args) => {
            this.setState({ mouseDown: false })
            onMouseUp && onMouseUp(...args)
          }}
          {...props}
          {...(mouseDown ? mouseDownProps : {})}
        />
      )
    }
  }

  WithMouseDownProps.displayName = wrapDisplayName(Target, 'withMouseDownProps')

  return WithMouseDownProps
}
