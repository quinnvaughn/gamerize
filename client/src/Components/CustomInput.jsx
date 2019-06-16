import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  font-weight: 600;
  width: 100%;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const SmallErrorMessage = styled.div`
  margin-bottom: 0.2rem;
  color: #db1422;
  font-size: 1.2rem;
`

export default function CustomInput({
  field,
  form: { touched, errors },
  ...props
}) {
  return (
    <Container>
      <Input {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <SmallErrorMessage>{errors[field.name]}</SmallErrorMessage>
      )}
    </Container>
  )
}
