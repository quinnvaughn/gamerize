import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import TrackVisibility from 'react-on-screen'

import DefaultBanner from '../default-banner.png'
import DefaultAvatar from '../default-avatar.png'
import SelectionOptions from '../Components/SelectionOptions'
import Footer from '../Components/Footer'
import Reviews from '../Components/Reviews'
import gamers from '../data/gamers'
import TodayAvailability from '../Components/TodayAvailability'
import NavBarWithScroll from '../Components/NavBarWithScroll'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 6rem;
`

const Content = styled.div`
  max-width: 108rem;
  margin: 0 auto;
  padding: 1rem 2.4rem 0;
  display: flex;
  position: relative;
`

const TopContainer = styled.div`
  width: 100%;
  display: flex;
`

const Gamer = styled.h2`
  font-size: 2rem;
  overflow-wrap: break-word;
`

const GamerContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  align-items: center;
`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: hidden;
  width: 6.4rem;
  height: 6.4rem;
`

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  overflow-wrap: break-word;
`

const TitleContainer = styled.div`
  flex: 6;
`

const Game = styled.h3`
  display: inline;
  font-size: 2rem;
  font-weight: bold;
`

const Occupations = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
  margin-top: 1rem;
  margin-bottom: 1.6rem;
`

const Occupation = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: black;
  border: 1px solid #dddfe2;
  padding: 0.4rem 0.6rem;
  display: inline-block;
  border-radius: 4px;
  margin-right: 0.8rem;
  :hover {
    cursor: default;
  }
`

const RequirementsAndDiscountsContainer = styled.div`
  display: flex;
`

const Requirements = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 5rem;
  margin-bottom: 0.5rem;
`

const Requirement = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
`

const InnerContainer = styled.div`
  flex: 50%;
  :not(:last-child) {
    padding-right: 1rem;
  }
`

const Discounts = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 5rem;
  margin-bottom: 0.5rem;
`

const Discount = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
`

const LeftSide = styled.div`
  flex: 60%;
  padding-right: 1rem;
  margin-top: 1rem;
`

const Systems = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
`

const BannerContainer = styled.div``

const Banner = styled.img`
  width: 100%;
  max-height: 40rem;
`

const TypeOfGameAndSlots = styled.div`
  display: flex;
`

const TypeOfGame = styled.span`
  flex: 1;
  margin-top: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
`

const Slots = styled.span`
  flex: 3;
  margin-top: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
`

const SnapTo = styled.div`
  position: absolute;
  top: -70px;
  left: 0;
`
const GamerInfo = styled.div`
  width: 100%;
`

const noUnderscores = string => string.replace(/_/g, ' ')

const formatCommas = (systems, system, index) => {
  if (index < systems.length - 1) {
    return <Systems key={system}>{`${system}, `}</Systems>
  } else {
    return <Systems key={system}>{`${system}`}</Systems>
  }
}

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

export default function SpecificSessionPage(props) {
  const [visibleSection, setVisibleSection] = useState(null)
  const [currentSection, setCurrentSection] = useState('#gamer')
  const { user, game } = props.match.params
  // won't need to do when getting data from db.
  const gamer = gamers.filter(singleGamer => singleGamer.username === user)[0]
  return (
    <PageContainer>
      <NavBarWithScroll
        visibleSection={currentSection}
        setVisible={setVisibleSection}
      />
      <BannerContainer>
        <Banner src={DefaultBanner} alt="Banner" />
      </BannerContainer>
      <Content>
        <SnapTo id="gamer" />
        <LeftSide>
          <TrackVisibility partialVisibility offset={-60}>
            {({ isVisible }) => {
              if (
                isVisible &&
                visibleSection !== '#availability' &&
                visibleSection !== '#reviews'
              ) {
                setVisibleSection('#gamer')
                setCurrentSection('#gamer')
              }
              if (!isVisible && visibleSection === '#gamer') {
                setVisibleSection(null)
              }
              return (
                <GamerInfo>
                  <TopContainer>
                    <TitleContainer>
                      <Title>{gamer.title}</Title>
                    </TitleContainer>
                    <GamerContainer>
                      <Avatar src={DefaultAvatar} alt="Avatar" />
                      <Gamer>{`${gamer.name}`}</Gamer>
                    </GamerContainer>
                  </TopContainer>
                  <Game>
                    {`${noUnderscores(game)} - `}
                    {gamer.systems.map((system, index) =>
                      formatCommas(gamer.systems, system, index)
                    )}
                  </Game>
                  <TypeOfGameAndSlots>
                    <TypeOfGame>
                      {gamer.typeOfGame === 'CUSTOM'
                        ? `${capitalize(gamer.typeOfGame)} game`
                        : capitalize(gamer.typeOfGame)}
                    </TypeOfGame>
                    <Slots>{`${gamer.slots} slots per session`}</Slots>
                  </TypeOfGameAndSlots>
                  <Occupations>
                    {gamer.occupation.map(occupation => (
                      <Occupation key={occupation}>{occupation}</Occupation>
                    ))}
                  </Occupations>
                  <RequirementsAndDiscountsContainer>
                    <InnerContainer>
                      <Requirements>Requirements:</Requirements>
                      {gamer.requirements.map(requirement => (
                        <Requirement key={requirement}>
                          {requirement}
                        </Requirement>
                      ))}
                    </InnerContainer>
                    <InnerContainer>
                      <Discounts>Discounts:</Discounts>
                      {gamer.discounts.map(discount => (
                        <Discount key={discount}>{discount}</Discount>
                      ))}
                    </InnerContainer>
                  </RequirementsAndDiscountsContainer>
                </GamerInfo>
              )
            }}
          </TrackVisibility>
          <TrackVisibility partialVisibility offset={-60}>
            {({ isVisible }) => {
              if (
                isVisible &&
                visibleSection !== '#gamer' &&
                visibleSection !== '#reviews'
              ) {
                setVisibleSection('#availability')
                setCurrentSection('#availability')
              }
              if (!isVisible && visibleSection === '#availability') {
                setVisibleSection(null)
              }
              return <TodayAvailability day={new Date()} />
            }}
          </TrackVisibility>
          <TrackVisibility partialVisibility offset={-60}>
            {({ isVisible }) => {
              if (
                isVisible &&
                visibleSection !== '#gamer' &&
                visibleSection !== '#availability'
              ) {
                setVisibleSection('#reviews')
                setCurrentSection('#reviews')
              }
              if (!isVisible && visibleSection === '#reviews') {
                setVisibleSection(null)
              }
              return (
                <Reviews
                  reviews={gamer.reviews}
                  numReviews={gamer.numReviews}
                />
              )
            }}
          </TrackVisibility>
        </LeftSide>
        <SelectionOptions
          gamer={gamer}
          game={game}
          slots={gamer.slots}
          price={gamer.price}
          numReviews={gamer.numReviews}
          reviews={gamer.reviews}
          systems={gamer.systems}
        />
      </Content>
      <Footer />
    </PageContainer>
  )
}
