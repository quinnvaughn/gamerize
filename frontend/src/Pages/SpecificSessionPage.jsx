import React from 'react'
import styled from 'styled-components'

import DefaultBanner from '../default-banner.png'
import NavBar from '../Components/NavBar'
import SelectionOptions from '../Components/SelectionOptions'

const gamers = [
  {
    name: 'Kyle',
    occupation: ['Celebrity', 'Rapper'],
    systems: ['Xbox One'],
    price: 180,
    rating: 4.8,
    numRatings: 500,
    username: 'SuperDuperKyle',
    requirements: [
      'Should have at least 50+ wins',
      'No hate - only good vibes',
    ],
    discounts: [
      '20% off for 4 or more sessions',
      '10% off for 2 or more users',
    ],
  },
  {
    name: 'Taylor Bennett',
    occupation: ['Celebrity', 'Rapper'],
    systems: ['PS4'],
    price: 200,
    rating: 4.0,
    numRatings: 400,
    username: 'Taylor_Bennett',
    requirements: [
      'Should have at least 50+ wins',
      'No hate - only good vibes',
    ],
    discounts: ['20% off for 4 or more sessions'],
  },
  {
    name: 'Shroud',
    occupation: ['Streamer'],
    systems: ['Xbox One', 'PC'],
    price: 200,
    rating: 4.92,
    numRatings: 2000,
    username: 'Shroud',
    requirements: [
      'Should have at least 50+ wins',
      'No hate - only good vibes',
    ],
    discounts: ['20% off for 4 or more sessions'],
  },
  {
    name: 'TSM Myth',
    occupation: ['Streamer'],
    systems: ['PC', 'PS4'],
    price: 190,
    rating: 4.6,
    numRatings: 587,
    username: 'TSM_Myth',
    requirements: [
      'Should have at least 50+ wins',
      'No hate - only good vibes',
    ],
    discounts: ['20% off for 4 or more sessions'],
  },
  {
    name: 'Ninja',
    occupation: ['Streamer'],
    systems: ['PC'],
    price: 250,
    rating: 4.97,
    numRatings: 5678,
    username: 'Ninja',
    requirements: [
      'Should have at least 50+ wins',
      'No hate - only good vibes',
    ],
    discounts: ['20% off for 4 or more sessions'],
  },
  {
    name: 'TimTheTatMan',
    occupation: ['Streamer'],
    systems: ['PC'],
    price: 165,
    rating: 4.8,
    numRatings: 5123,
    username: 'TimTheTatMan',
    requirements: [
      'Should have at least 50+ wins',
      'No hate - only good vibes',
    ],
    discounts: ['20% off for 4 or more sessions'],
  },
  {
    name: 'DisguisedToast',
    occupation: ['Streamer'],
    systems: ['PC'],
    price: 100,
    rating: 4.8,
    numRatings: 786,
    username: 'DisguisedToast',
    requirements: [
      'Should have at least 50+ wins',
      'No hate - only good vibes',
    ],
    discounts: ['20% off for 4 or more sessions'],
  },
  {
    name: 'PewDiePie',
    occupation: ['Youtuber'],
    systems: ['Xbox One'],
    price: 300,
    rating: 4.4,
    numRatings: 1999,
    username: 'PewDiePie',
    requirements: [
      'Should have at least 50+ wins',
      'No hate - only good vibes',
    ],
    discounts: ['20% off for 4 or more sessions'],
  },
]

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0px 24px;
  display: flex;
`

const Gamer = styled.h1`
  font-size: 40px;
  font-weight: bold;
`

const Game = styled.h2`
  font-size: 20px;
  font-weight: bold;
`

const Occupations = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: black;
  margin-top: 10px;
  margin-bottom: 16px;
`

const Occupation = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: black;
  border: 1px solid #d3d3d3;
  padding: 4px 6px;
  display: inline-block;
  border-radius: 4px;
  margin-right: 8px;
  :hover {
    cursor: default;
  }
`

const RequirementsAndDiscountsContainer = styled.div`
  display: flex;
`

const Requirements = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 5px;
`

const Requirement = styled.div`
  font-size: 14px;
  font-weight: 400;
`

const InnerContainer = styled.div`
  flex: 50%;
  :not(:last-child) {
    padding-right: 10px;
  }
`

const Discounts = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 5px;
`

const Discount = styled.div`
  font-size: 14px;
  font-weight: 400;
`

const LeftSide = styled.div`
  flex: 60%;
  padding-right: 10px;
`

const Systems = styled.span`
  font-size: 14px;
  font-weight: 400;
`

const BannerContainer = styled.div``

const Banner = styled.img`
  width: 100%;
  max-height: 400px;
`

const noUnderscores = string => string.replace(/_/g, ' ')

const formatCommas = (systems, system, index) => {
  if (index < systems.length - 1) {
    return <Systems key={system}>{`${system}, `}</Systems>
  } else {
    return <Systems key={system}>{`${system}`}</Systems>
  }
}

export default function SpecificSessionPage(props) {
  const { user, game } = props.match.params
  // won't need to do when getting data from db.
  const gamer = gamers.filter(singleGamer => singleGamer.username === user)[0]
  return (
    <PageContainer>
      <NavBar />
      <BannerContainer>
        <Banner src={DefaultBanner} alt="Banner" />
      </BannerContainer>
      <Content>
        <LeftSide>
          <Gamer>{`${gamer.name}`}</Gamer>
          <Game>
            {`${noUnderscores(game)} - `}
            {gamer.systems.map((system, index) =>
              formatCommas(gamer.systems, system, index)
            )}
          </Game>
          <Occupations>
            {gamer.occupation.map(occupation => (
              <Occupation key={occupation}>{occupation}</Occupation>
            ))}
          </Occupations>
          <RequirementsAndDiscountsContainer>
            <InnerContainer>
              <Requirements>Requirements:</Requirements>
              {gamer.requirements.map(requirement => (
                <Requirement key={requirement}>{requirement}</Requirement>
              ))}
            </InnerContainer>
            <InnerContainer>
              <Discounts>Discounts:</Discounts>
              {gamer.discounts.map(discount => (
                <Discount key={discount}>{discount}</Discount>
              ))}
            </InnerContainer>
          </RequirementsAndDiscountsContainer>
        </LeftSide>
        <SelectionOptions
          price={gamer.price}
          numRatings={gamer.numRatings}
          rating={gamer.rating}
          systems={gamer.systems}
        />
      </Content>
    </PageContainer>
  )
}
