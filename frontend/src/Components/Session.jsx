import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

import DefaultAvatar from '../default-avatar.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 ${props => `${props.width}%`};
  margin-bottom: 1rem;
`

const Avatar = styled.img`
  height: 10rem;
  width: 10rem;
`

const Name = styled.h4`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`

const Systems = styled.p`
  font-size: 1.4rem;
  color: black;
`

const System = styled.span`
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
  margin-right: 0.5rem;
  font-size: 1.2rem;
  color: black;
`

const StyledLink = styled(Link)`
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
        <Avatar src={DefaultAvatar} alt="Avatar" />
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
          numberOfStars={5}
          name="rating"
          starDimension="14px"
          starSpacing="1px"
        />
        <NumReviews>{`(${props.numReviews})`}</NumReviews>
      </StyledLink>
    </Container>
  )
}
