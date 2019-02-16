import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 80px;
  font-weight: bold;
  position: absolute;
  color: white;
  top: 80px;
  left: 80px;
  text-rendering: optimizeLegibility;
`

export default function HomeTitle(props) {
  return <Title>{props.text}</Title>
}
