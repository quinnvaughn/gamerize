import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 8rem;
  font-weight: bold;
  color: black;
  text-rendering: optimizeLegibility;
`

export default function HomeTitle(props) {
  return <Title>{props.text}</Title>
}
