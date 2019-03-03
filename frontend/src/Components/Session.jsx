import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

import DefaultAvatar from '../default-avatar.png'

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
`

const AvatarContainer = styled.div`
  width: 100%;
  padding-top: 66.6667%;
  position: relative;
  background-size: 100% 100%;
`

const AvatarSecond = styled.div`
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  height: 100% !important;
  width: 100% !important;
`

const AvatarThird = styled.div`
  width: 100%;
  height: 100%;
  position: relative !important;
`

const Avatar = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  background-size: cover !important;
  background-position: 50% 50% !important;
  background-repeat: no-repeat !important;
  height: 100%;
  width: 100%;
  background-image: url(${props => props.src});
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
`

const Title = styled.div`
  margin-top: 0.8rem;
  font-size: 1.8rem;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
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
  margin-right: 0.5rem;
  font-size: 1.2rem;
  color: black;
`

const StyledLink = styled(Link)`
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  font-size: 1.6rem;
  text-decoration: none;
  color: black;
  :hover {
    color: #e62739;
    cursor: pointer;
  }
`

// pulled function out and named it to make it more obvious and clean up return

const formatCommas = (systems, system, index, username) => {
  if (index < systems.length - 1) {
    return <System key={`${username} ${system}`}>{`${system}, `}</System>
  } else {
    return <System key={`${username} ${system}`}>{system}</System>
  }
}

export default function Session(props) {
  return (
    <Container width={props.width}>
      <StyledLink to={`/users/${props.username}/${props.game}`}>
        <AvatarContainer src={DefaultAvatar}>
          <AvatarSecond>
            <AvatarThird>
              <Avatar src={DefaultAvatar} />
            </AvatarThird>
          </AvatarSecond>
        </AvatarContainer>
        <Title>{props.title}</Title>
        <Name>{props.name}</Name>
        <Systems>
          {props.systems.map((system, index) =>
            formatCommas(props.systems, system, index, props.username)
          )}
        </Systems>
        <Price>{`Starting at $${props.price} a game`}</Price>
        <Reviews>{props.reviews}</Reviews>
        <StarRatings
          rating={props.reviews}
          starRatedColor="#e62739"
          numberOfStars={1}
          name="rating"
          starDimension="14px"
          starSpacing="1px"
        />
        <NumReviews>{`(${props.numReviews})`}</NumReviews>
      </StyledLink>
    </Container>
  )
}
