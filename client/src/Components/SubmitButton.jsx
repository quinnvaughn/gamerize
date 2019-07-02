import React from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types'

const Button = styled.button`
  background: ${props =>
    !props.isValid ? '#ebebeb' : props.primary ? '#db1422' : '#fff'};
  padding: 1rem 1.4rem;
  color: ${props => (props.primary ? '#fff' : '#db1422')};
  cursor: pointer;
  outline: 0;
  border: 1px solid ${props => (!props.isValid ? '#ebebeb' : '#db1422')};
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 1rem;
  width: ${props => (props.width ? `${props.width}px` : '160px')};
  pointer-events: ${props => props.disabled && 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export default function SubmitButton(props) {
  return (
    <Button
      primary={props.primary}
      onClick={props.onClick}
      type="submit"
      width={props.width}
      isValid={props.isValid}
      disabled={props.isSubmitting || !props.isValid || props.disabled}
    >
      {props.isSubmitting ? (
        <ReactLoading
          type="spinningBubbles"
          color={props.primary ? '#fff' : '#db1422'}
          height={19}
          width={19}
        />
      ) : (
        props.children
      )}
    </Button>
  )
}

SubmitButton.defaultProps = {
  isValid: true,
  disabled: false,
  primary: true,
}
