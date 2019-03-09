import React from 'react'
import styled from 'styled-components'
import HomeTitle from './HomeTitle'

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  padding-left: 8rem;
  padding-bottom: 4rem;

  @media (max-width: 1127px) {
    padding-left: 2.4rem;
  }
`

// const Img = styled.img`
//   width: 100%;
//   height: 100%;
//   opacity: 0.6;
// `

export default function Jumbotron(props) {
  return (
    <TitleContainer>
      {/* <Img src={GamingJumbotron} alt="Gaming Jumbotron" /> */}
      <HomeTitle text="Play with your favorite Gamers" />
    </TitleContainer>
  )
}
