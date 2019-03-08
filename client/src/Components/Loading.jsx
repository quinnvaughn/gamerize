import React from 'react'
import styled from 'styled-components'
import Loading from 'react-loading-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export default function LoadingComponent(props) {
  return (
    <Container>
      <Loading type="grid" fill="#f10e0e" width={100} height={100} />
    </Container>
  )
}
