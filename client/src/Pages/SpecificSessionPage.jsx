import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import _ from 'lodash'
import gql from 'graphql-tag'
import Media from 'react-media'

import DefaultBanner from '../default-banner.png'
import DefaultAvatar from '../default-avatar.png'
import SelectionOptions from '../Components/SelectionOptions'
import Footer from '../Components/Footer'
import Reviews from '../Components/Reviews'
import TodayAvailability from '../Components/TodayAvailability'
import NavBarWithScroll from '../Components/NavBarWithScroll'
import FixedSelectionOptions from '../Components/FixedSelectionOptions'
import { noUnderscores, capitalize, singleOrPlural } from '../utils/Strings'
import { formatGamers } from '../utils/Strings'

//data

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 6rem;
`

const Content = styled.div`
  padding-top: 2rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  max-width: none;
  padding-bottom: 6rem;
  display: flex;
  @media (min-width: 743px) {
    max-width: 69.6rem;
    margin: 0 auto;
    width: auto;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }
  @media (min-width: 1128px) {
    margin: 0 auto;
    max-width: 108rem;
    display: flex;
  }
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
  white-space: nowrap;
`

const GamerLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: black;
  :hover {
    color: #f10e0e;
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
  flex: 7;
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
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
  margin-top: 0.5rem;
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

const Length = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
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

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
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
  flex: 3;
`

const formatCommas = (systems, system, index) => {
  if (index < systems.length - 1) {
    return <Systems key={system}>{`${system}, `}</Systems>
  } else {
    return <Systems key={system}>{`${system}`}</Systems>
  }
}

const GET_SPECIFIC_SESSION = gql`
  query($sessionId: String!) {
    getSpecificSession(sessionId: $sessionId) {
      title
      length
      type
      slots
      price
      slotsLeftToday
      reviewRating
      numReviews
      system
      game {
        name
      }
      gamers {
        occupations
        username
        name
      }
    }
  }
`

const GET_SLOTS_TODAY = gql`
  query($sessionId: String!) {
    specificSessionSlotsToday(sessionId: $sessionId) {
      startTime
      length
      slots
      id
      passed
      players {
        player {
          username
        }
      }
    }
  }
`

export default function SpecificSessionPage(props) {
  const { data, loading } = useQuery(GET_SPECIFIC_SESSION, {
    variables: { sessionId: props.match.params.id },
    pollInterval: 5000,
  })
  const { data: secondData, loading: secondLoading } = useQuery(
    GET_SLOTS_TODAY,
    {
      variables: { sessionId: props.match.params.id },
      pollInterval: 5000,
    }
  )
  return loading || secondLoading ? null : (
    <PageContainer>
      <NavBarWithScroll
      // visibleSection={currentSection}
      // setVisible={setVisibleSection}
      />
      <BannerContainer>
        <Banner src={DefaultBanner} alt="Banner" />
      </BannerContainer>
      <Content>
        <LeftSide>
          <GamerInfo>
            <TopContainer>
              <TitleContainer>
                <Title>{data.getSpecificSession.title}</Title>
              </TitleContainer>
              {/* <GamerContainer>
                <GamerLink to={`/users/${gamer.username}`}>
                  <Avatar src={DefaultAvatar} alt="Avatar" />
                  <Gamer>{`${gamer.name}`}</Gamer>
                </GamerLink>
                <Occupations>
                  {gamer.occupations.map(occupation => (
                    <Occupation key={occupation}>{occupation}</Occupation>
                  ))}
                </Occupations>
              </GamerContainer> */}
            </TopContainer>
            <MiddleContainer>
              <FlexHalf>
                <Flex>
                  <TypeOfContent>Game</TypeOfContent>
                  <Game>{`${noUnderscores(
                    data.getSpecificSession.game.name
                  )}`}</Game>
                </Flex>
                <Flex>
                  <TypeOfContent>System</TypeOfContent>
                  <Systems>{data.getSpecificSession.system}</Systems>
                </Flex>
                <Flex>
                  <TypeOfContent>Game Length</TypeOfContent>
                  <Length>{`${data.getSpecificSession.length} minutes`}</Length>
                </Flex>
              </FlexHalf>
              <FlexHalf>
                <Flex>
                  <TypeOfContent>Type of game</TypeOfContent>
                  <TypeOfGame>
                    {capitalize(data.getSpecificSession.type)}
                  </TypeOfGame>
                </Flex>
                <Flex>
                  <TypeOfContent>Slots per session</TypeOfContent>
                  <Slots>{`${data.getSpecificSession.slots}`}</Slots>
                </Flex>
              </FlexHalf>
            </MiddleContainer>
            {/* <RequirementsAndDiscountsContainer>
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
            </RequirementsAndDiscountsContainer> */}
          </GamerInfo>
          <TodayAvailability
            day={new Date()}
            sessions={secondData.specificSessionSlotsToday}
          />
          {/*<Reviews reviews={gamer.reviews} numReviews={gamer.numReviews} /> */}
        </LeftSide>
        <Media query="(max-width: 1127px)">
          {matches =>
            matches ? (
              <FixedSelectionOptions
                gamer={formatGamers(data.getSpecificSession.gamers)}
                game={data.getSpecificSession.game.name}
                slotsLeftToday={data.getSpecificSession.slotsLeftToday}
                slots={data.getSpecificSession.slots}
                price={data.getSpecificSession.price}
                numReviews={data.getSpecificSession.numReviews}
                reviewRating={data.getSpecificSession.reviewRating}
                system={data.getSpecificSession.system}
              />
            ) : (
              <SelectionOptions
                gamer={formatGamers(data.getSpecificSession.gamers)}
                game={data.getSpecificSession.game.name}
                slotsLeftToday={data.getSpecificSession.slotsLeftToday}
                slots={data.getSpecificSession.slots}
                price={data.getSpecificSession.price}
                numReviews={data.getSpecificSession.numReviews}
                reviewRating={data.getSpecificSession.reviewRating}
                system={data.getSpecificSession.system}
              />
            )
          }
        </Media>
      </Content>

      <Footer />
    </PageContainer>
  )
}

{
  /* <LeftSide>
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
                  {gamer.occupations.map(occupation => (
                    <Occupation key={occupation}>{occupation}</Occupation>
                  ))}
                </Occupations>
              </GamerContainer>
            </TopContainer>
            <MiddleContainer>
              <FlexHalf>
                <Flex>
                  <TypeOfContent>Game</TypeOfContent>
                  <Game>{`${noUnderscores(game)}`}</Game>
                </Flex>
                <Flex>
                  <TypeOfContent>{`${singleOrPlural(
                    gamer.systems,
                    'System'
                  )}`}</TypeOfContent>
                  {gamer.systems.map((system, index) =>
                    formatCommas(gamer.systems, system, index)
                  )}
                </Flex>
                <Flex>
                  <TypeOfContent>Length</TypeOfContent>
                  <Length>{`${gamer.length} minutes`}</Length>
                </Flex>
              </FlexHalf>
              <FlexHalf>
                <Flex>
                  <TypeOfContent>Type of game</TypeOfContent>
                  <TypeOfGame>
                    {capitalize(game.type)}
                  </TypeOfGame>
                </Flex>
                <Flex>
                  <TypeOfContent>Slots per session</TypeOfContent>
                  <Slots>{`${gamer.slots}`}</Slots>
                </Flex>
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
        <Media query="(max-width: 1127px)">
          {matches =>
            matches ? (
              <FixedSelectionOptions
                gamer={gamer}
                game={game}
                slots={gamer.slots}
                price={gamer.price}
                numReviews={gamer.numReviews}
                reviewRating={gamer.reviewRating}
                systems={gamer.systems}
              />
            ) : (
              <SelectionOptions
                gamer={gamer}
                game={game}
                slots={gamer.slots}
                price={gamer.price}
                numReviews={gamer.numReviews}
                reviewRating={gamer.reviewRating}
                systems={gamer.systems}
              />
            )
          }
        </Media> */
}
