import React from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const InputLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.color};
`

const Input = styled.input`
  padding: 1rem 0;
  padding-left: 1rem;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  :focus {
    outline: none;
  }
`

export default function SocialMediaInput(props) {
  return (
    <InputContainer>
      <InputLabel color={props.color}>{props.label}</InputLabel>
      <Input
        placeholder="Link"
        value={props.container.state.socialMedia[props.socialMedia]}
        name={props.socialMedia}
        onChange={e =>
          props.container.setSocialMedia(e.target.name, e.target.value)
        }
      />
    </InputContainer>
  )
}
