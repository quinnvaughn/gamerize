import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

import DynamicImage from './DynamicImage'
import { noSpaces, formatSystem } from '../utils/Strings'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  position: relative;
  :last-child {
    margin-right: 0;
  }
  @media (max-width: 969px) {
    width: 50% !important;
  }
  @media (max-width: 1239px) and (min-width: 970px) {
    width: 33.333% !important;
  }
  @media (max-width: 1779px) and (min-width: 1510px) {
    width: 20% !important;
  }
  @media (max-width: 1509px) and (min-width: 1240px) {
    width: 25% !important;
  }
  @media (min-width: 1780px) {
    width: 16.6667% !important;
  }
`

const Name = styled.div`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: nowrap;
  text-size-adjust: 100%;
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  cursor: pointer;
  line-height: 1.375em;
  color: black;
`

const TitleContainer = styled.div`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Title = styled.div`
  margin-top: 0.8rem;
  font-size: 1.8rem;
  font-weight: 800;
  cursor: pointer;
  overflow-wrap: break-word;
  width: 100%;
  line-height: 1.375em;
`

const Systems = styled.p`
  font-size: 1.4rem;
  color: black;
`

const System = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: black;
`

const Game = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: black;
`

const Price = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
`

const NumReviews = styled.span`
  margin-left: 0.5rem;
  color: black;
  font-size: 1.2rem;
`
const Reviews = styled.span`
  font-size: 1.2rem;
  color: #db1422;
  margin-right: 0.5rem;
  font-weight: 600;
`

const StyledLink = styled(Link)`
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  font-size: 1.6rem;
  text-decoration: none;
  color: black;
  :hover {
    color: #db1422;
    cursor: pointer;
  }
`

const Bottom = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const SlotsAvailable = styled.div`
  color: #db1422;
  font-size: 1.6rem;
  font-weight: 600;
`

export default function ExploreSession(props) {
  return (
    <Container>
      <StyledLink
        to={`/users/${props.username}/${noSpaces(props.game)}/${props.id}`}
      >
        <DynamicImage src={props.profilePicture} />
        <TitleContainer>
          <Title>{props.title}</Title>
        </TitleContainer>
        <Name>{props.name}</Name>
        <Systems>
          <Game>{`${props.game} - `}</Game>
          <System>{formatSystem(props.system)}</System>
        </Systems>
        <Price>{`Starting at $${parseFloat(props.price).toFixed(
          2
        )} a game`}</Price>
        <Bottom>
          {props.slotsAvailable && (
            <SlotsAvailable>Slots Available</SlotsAvailable>
          )}
        </Bottom>
        {/* <Bottom>
          <Reviews>{props.reviews}</Reviews>
          <StarRatings
            rating={props.reviews}
            starRatedColor="#db1422"
            numberOfStars={5}
            name="rating"
            starDimension="14px"
            starSpacing="1px"
          />
          <NumReviews>{`(${props.numReviews})`}</NumReviews>
        </Bottom> */}
      </StyledLink>
    </Container>
  )
}
