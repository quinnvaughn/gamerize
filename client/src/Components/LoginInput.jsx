import React, { Fragment } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  outline: 0;
  border-radius: 4px;
  border: 1px solid #dddfe2;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  :last-of-type {
    margin-bottom: 2rem;
  }
`

const SmallErrorMessage = styled.div`
  margin-bottom: 0.5rem;
  color: #db1422;
  font-size: 1.2rem;
`

export default function LoginInput({
  field,
  form: { touched, errors },
  label,
  ...props
}) {
  return (
    <Fragment>
      <Input type={props.type ? props.type : 'text'} {...field} {...props} />
      {errors[field.name] && touched[field.name] ? (
        <SmallErrorMessage>{errors[field.name]}</SmallErrorMessage>
      ) : null}
    </Fragment>
  )
}
