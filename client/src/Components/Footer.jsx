import React from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'

const Container = styled.div`
  z-index: 0;
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

const Discord = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-right: 1rem;
  :hover {
    cursor: pointer;
    color: #db1422;
  }
`

const Copyright = styled.div`
  font-size: 1.6rem;
`

export default function Footer(props) {
  return (
    <Container><Discord onClick={() => window.location = "https://discord.gg/RVB43KF"}>Discord</Discord><Copyright>&copy;{` ${dateFns.getYear(new Date())} Gamerize`}</Copyright></Container>
  )
}
