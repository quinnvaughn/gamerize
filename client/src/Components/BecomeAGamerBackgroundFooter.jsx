import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { useBecomeAGamer } from '../State/BecomeAGamerContext'

const Previous = styled(Link)`
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const PreviousText = styled.span`
  color: #db1422;
  font-size: 1.6rem;
  font-weight: 600;
`

const PreviousArrow = styled(FaChevronLeft)`
  color: #db1422;
  font-size: 1.6rem;
  margin-right: 0.5rem;
`

const Next = styled(Link)`
  color: #fff;
  text-decoration: none;
  outline: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2.2rem;
  background: ${props => (props.disabled ? '#dddfe2' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
`

const ButtonsContainer = styled.div`
  position: fixed;
  z-index: 200;
  bottom: 0;
  left: 0;
  width: 100%;
`

const ButtonsInner = styled.div`
  max-width: 91.2rem;
  margin: 0 auto;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
`

const Buttons = styled.div`
  background: #fff;
  border-top: 1px solid #dddfe2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 3rem 1.6rem;
  width: 60%;
  @media (max-width: 1127px) {
    width: 100%;
  }
`

export default function BecomeAGamerBackgroundFooter(props) {
  const [becomeAGamer] = useBecomeAGamer()
  return (
    <ButtonsContainer>
      <ButtonsInner>
        <Buttons>
          <Previous to="/become-a-gamer">
            <PreviousArrow />
            <PreviousText>Previous</PreviousText>
          </Previous>
          <Next
            to="/become-a-gamer/details"
            disabled={becomeAGamer.occupations.length <= 0}
          >
            Next
          </Next>
        </Buttons>
      </ButtonsInner>
    </ButtonsContainer>
  )
}
