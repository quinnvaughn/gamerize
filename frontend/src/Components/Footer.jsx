import React from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 2rem 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  height: 6rem;
`

export default function Footer(props) {
  return (
    <Container>&copy;{` ${dateFns.getYear(new Date())} Gamerize`}</Container>
  )
}
