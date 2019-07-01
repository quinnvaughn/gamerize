import React from 'react'
import styled from 'styled-components'

const Row = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 0.5rem;
`

const RowLeft = styled.div`
  flex: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  padding-right: 0.8rem;
`

const Label = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`

const RowRight = styled.div`
  flex: 75%;
  position: ${props => props.relative && 'relative'};
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
  width: 100%;
  font-weight: 400;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const SmallErrorMessage = styled.div`
  margin-bottom: 0.2rem;
  color: #db1422;
  font-size: 1.2rem;
`

export default function EditProfileInput({
  field,
  form: { touched, errors },
  label,
  ...props
}) {
  return (
    <Row>
      <RowLeft>
        <Label>{label}</Label>
      </RowLeft>
      <RowRight>
        <Input type={props.type ? props.type : 'text'} {...field} {...props} />
        {errors[field.name] && touched[field.name] ? (
          <SmallErrorMessage>{errors[field.name]}</SmallErrorMessage>
        ) : null}
      </RowRight>
    </Row>
  )
}
