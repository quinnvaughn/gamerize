import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import _ from 'underscore'

import DefaultBanner from '../default-banner.png'
import DefaultAvatar from '../default-avatar.png'
import SelectionOptions from '../Components/SelectionOptions'
import Footer from '../Components/Footer'
import Reviews from '../Components/Reviews'
import TodayAvailability from '../Components/TodayAvailability'
import NavBarWithScroll from '../Components/NavBarWithScroll'

//data
import gamers from '../data/gamers'

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
  margin-bottom: 2.4rem;
  padding-bottom: 2.4rem;
  border-bottom: 1px solid #dddfe2;
`

const Gamer = styled.h2`
  font-size: 2rem;
  overflow-wrap: break-word;
`

const GamerLink = styled(Link)`
  display: flex;
  flex-direction: column;
  flex: 4;
  align-items: center;
  text-decoration: none;
  color: black;
  :hover {
    color: #e62739;
  }
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
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
`

const Occupations = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
  margin-top: 1rem;
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
  :last-child {
    margin-right: 0;
  }
  :hover {
    cursor: default;
  }
`

const RequirementsAndDiscountsContainer = styled.div`
  display: flex;
  padding-bottom: 2.4rem;
  margin-bottom: 2.4rem;
  border-bottom: 1px solid #dddfe2;
`

const Requirement = styled.div`
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 400;
`

const InnerContainer = styled.div`
  flex: 50%;
  :not(:last-child) {
    padding-right: 1rem;
  }
`

const Discount = styled.div`
  font-size: 1.6rem;
  line-height: 2.2rem;
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
  line-height: 2.2rem;
`

const BannerContainer = styled.div`
  height: 40rem;
`

const Banner = styled.img`
  width: 100%;
  max-height: 40rem;
`

const TypeOfGame = styled.span`
  line-height: 2.2rem;
  font-size: 1.6rem;
  font-weight: 400;
`

const Slots = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
`

const SnapTo = styled.div`
  position: absolute;
  top: -70px;
  left: 0;
`
const GamerInfo = styled.div`
  width: 100%;
`

const MiddleContainer = styled.div`
  padding-bottom: 2.4rem;
  margin-bottom: 2.4rem;
  border-bottom: 1px solid #dddfe2;
  display: flex;
`

const FlexHalf = styled.div`
  flex: 1;
`

const TypeOfContent = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 1.6rem;
  line-height: 2.2rem;
  :first-child {
    margin-top: 0;
  }
`

const GamerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const { user, game } = props.match.params
  // won't need to do when getting data from db.
  const gamer = _.findWhere(gamers, { username: user })
  return (
    <PageContainer>
      <NavBarWithScroll
      // visibleSection={currentSection}
      // setVisible={setVisibleSection}
      />
      <BannerContainer>
        <Banner src={DefaultBanner} alt="Banner" />
      </BannerContainer>
      <Content>
        <SnapTo id="gamer" />
        <LeftSide>
          <GamerInfo>
            <TopContainer>
              <TitleContainer>
                <Title>{gamer.title}</Title>
              </TitleContainer>
              <GamerContainer>
                <GamerLink to={`/users/${gamer.username}`}>
                  <Avatar src={DefaultAvatar} alt="Avatar" />
                  <Gamer>{`${gamer.name}`}</Gamer>
                </GamerLink>
                <Occupations>
                  {gamer.occupation.map(occupation => (
                    <Occupation key={occupation}>{occupation}</Occupation>
                  ))}
                </Occupations>
              </GamerContainer>
            </TopContainer>
            <MiddleContainer>
              <FlexHalf>
                <TypeOfContent>Game</TypeOfContent>
                <Game>{`${noUnderscores(game)}`}</Game>
                <TypeOfContent>{`${
                  gamer.systems.length === 1 ? 'System' : 'Systems'
                }`}</TypeOfContent>
                {gamer.systems.map((system, index) =>
                  formatCommas(gamer.systems, system, index)
                )}
              </FlexHalf>
              <FlexHalf>
                <TypeOfContent>Type Of Game</TypeOfContent>
                <TypeOfGame>
                  {gamer.typeOfGame === 'CUSTOM'
                    ? `${capitalize(gamer.typeOfGame)}`
                    : capitalize(gamer.typeOfGame)}
                </TypeOfGame>
                <TypeOfContent>Slots Per Session</TypeOfContent>
                <Slots>{`${gamer.slots}`}</Slots>
              </FlexHalf>
            </MiddleContainer>
            <RequirementsAndDiscountsContainer>
              <InnerContainer>
                <TypeOfContent>Requirements</TypeOfContent>
                {gamer.requirements.map(requirement => (
                  <Requirement key={requirement}>{requirement}</Requirement>
                ))}
              </InnerContainer>
              <InnerContainer>
                <TypeOfContent>Discounts</TypeOfContent>
                {gamer.discounts.map(discount => (
                  <Discount key={discount}>{discount}</Discount>
                ))}
              </InnerContainer>
            </RequirementsAndDiscountsContainer>
          </GamerInfo>
          <TodayAvailability day={new Date()} />
          <Reviews reviews={gamer.reviews} numReviews={gamer.numReviews} />
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
