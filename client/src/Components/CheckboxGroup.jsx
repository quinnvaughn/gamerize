import React, { Component } from 'react'

export default class CheckboxGroup extends Component {
  handleChange = event => {
    const target = event.currentTarget
    let valueArray = [...this.props.value] || []

    if (target.checked) {
      valueArray.push(target.id)
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1)
    }

    this.props.onChange(this.props.id, valueArray)
  }

  handleBlur = () => {
    this.props.onBlur(this.props.id, true)
  }

  render() {
    const { value, label, children } = this.props

    return (
      <div>
        <legend>{label}</legend>
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            field: {
              value: value.includes(child.props.id),
              onChange: this.handleChange,
              onBlur: this.handleBlur,
            },
          })
        })}
      </div>
    )
  }
}
