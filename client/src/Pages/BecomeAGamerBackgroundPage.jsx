import React from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import _ from 'lodash'

//local imports
import Gamer from '../Containers/BecomeAGamerContainer'
import ProgressNav from '../Components/ProgressNav'
import useTitle from '../Hooks/useTitle'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  max-width: 91.2rem;
  margin: 0 auto;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  height: 100%;
  padding-top: 7rem;
`

const Container = styled.div`
  width: 60%;
  padding: 3rem 3rem 1.6rem;
  height: 100%;
  position: relative;
`

const Title = styled.div`
  word-wrap: break-word;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.75em;
`

const Subtitle = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.25em;
  margin-bottom: 2rem;
`

const Types = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4rem;
`

const TypeOfGamer = styled.button`
  border-radius: 4px;
  cursor: pointer;
  background: ${props => (props.selected ? '#f10e0e' : '#fff')};
  color: ${props => (props.selected ? '#fff' : '#f10e0e')};
  border: ${props =>
    !props.selected ? '1px solid #f10e0e' : '1px solid transparent'};
  padding: 1rem 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  outline: 0;
  :last-of-type {
    margin-right: 0;
  }
`

const Previous = styled(Link)`
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const PreviousText = styled.span`
  color: #f10e0e;
  font-size: 1.6rem;
  font-weight: 600;
`

const PreviousArrow = styled(FaChevronLeft)`
  color: #f10e0e;
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
  background: ${props => (props.disabled ? '#dddfe2' : '#f10e0e')};
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
`

const DontSeeYours = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`

const YoursTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const YoursText = styled.textarea`
  border-radius: 4px;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1.6rem;
  outline: none;
  :focus {
    border: 1px solid #f10e0e;
  }
`

const occupation = [
  'Celebrity',
  'Influencer',
  'Streamer',
  'Youtuber',
  'Media',
  'Sports Personality',
  'Internet Personality',
  'Athlete',
  'Professional Gamer',
  'Actor',
  'Comedian',
  'Rock Star',
  'Rapper',
  'Singer',
  'Musician',
  'Politician',
  'DJ',
  'Music Producer',
  'Entrepreneur',
  'Artist',
  'Actress',
]

export default function BecomeAGamerBackground(props) {
  useTitle('Kind of Gamer')
  return (
    <Subscribe to={[Gamer]}>
      {container => (
        <PageContainer>
          <ProgressNav />
          <Content>
            <Container>
              <Title>What kind of gamer are you?</Title>
              <Subtitle>You may pick multiple</Subtitle>
              <Types>
                {_.map(occupation, type => (
                  <TypeOfGamer
                    onClick={() => container.setOccupation(type)}
                    selected={container.state.occupation.includes(type)}
                  >
                    {type}
                  </TypeOfGamer>
                ))}
              </Types>
              <DontSeeYours>
                <YoursTitle>
                  Don't see your type? Let us know to add it.
                </YoursTitle>
                <YoursText rows="4" cols="50" />
              </DontSeeYours>
            </Container>
          </Content>
          <ButtonsContainer>
            <ButtonsInner>
              <Buttons>
                <Previous to="/become-a-gamer">
                  <PreviousArrow />
                  <PreviousText>Previous</PreviousText>
                </Previous>
                <Next
                  to="/become-a-gamer/details"
                  disabled={container.state.occupation.length <= 0}
                >
                  Next
                </Next>
              </Buttons>
            </ButtonsInner>
          </ButtonsContainer>
        </PageContainer>
      )}
    </Subscribe>
  )
}
