import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  position: fixed;
  z-index: 100;
  background: #fff;
`

const Nav = styled.nav`
  height: 6rem;
  border-bottom: 1px solid #fdebec;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 4rem;
`

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1.5em;
`

const ProgressBar = styled.div`
  background: #fdebec;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0 1px 0;
  height: 1rem;
`

const Filler = styled.div`
  width: ${props => `${props.progress}%`};
  background: #f10e0e;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  height: 100%;
`

function ProgressNav(props) {
  const [progress, setProgress] = useState(0)
  const [title, setTitle] = useState('')
  useEffect(() => {
    if (props.match.path === '/become-a-gamer/background') {
      setProgress(0)
      setTitle(`Step 1: Start with your gamer type`)
    }
    if (props.match.path === '/become-a-gamer/details') {
      setProgress(50)
      setTitle(`Step 2: Verify who you are`)
    }
    if (props.match.path === '/become-a-gamer/finished') {
      setProgress(100)
      setTitle(`Finished!`)
    }
  }, [props.match.path])
  return (
    <Container>
      <Nav>
        <Title>{title}</Title>
      </Nav>
      <ProgressBar>
        <Filler progress={progress} />
      </ProgressBar>
    </Container>
  )
}

export default withRouter(ProgressNav)
