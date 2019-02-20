import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

import DefaultAvatar from '../default-avatar.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.6666666666%;
`

const Avatar = styled.img`
  height: 10rem;
  width: 10rem;
`

const Name = styled.h4`
  font-size: 1.8rem;

  margin-bottom: 0.3rem;
`

const Systems = styled.p`
  font-size: 1.4rem;
  color: black;
  font-weight: 400;
`

const System = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
`

const Price = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
`

const NumRatings = styled.span`
  margin-left: 0.5rem;
  color: black;
  font-size: 1.2rem;
`
const Rating = styled.span`
  margin-right: 0.5rem;
  font-size: 1.2rem;
  color: black;
`

const StyledLink = styled(Link)`
  font-size: 1.6rem;
  text-decoration: none;
  color: black;
  :hover {
    color: red;
    cursor: pointer;
  }
`

// pulled function out and named it to make it more obvious and clean up return

export default function Session(props) {
  return (
    <Container>
      <StyledLink to={`/users/${props.username}/${props.game}`}>
        <Avatar src={DefaultAvatar} alt="Avatar" />
        <Name>{props.name}</Name>
        <Systems>
          {props.systems.map(system => (
            <System>{system}</System>
          ))}
        </Systems>
        <Price>{`Starting at $${props.price} a game`}</Price>
        <Rating>{props.rating}</Rating>
        <StarRatings
          rating={props.rating}
          starRatedColor="red"
          numberOfStars={5}
          name="rating"
          starDimension="14px"
          starSpacing="1px"
        />
        <NumRatings>{`(${props.numRatings})`}</NumRatings>
      </StyledLink>
    </Container>
  )
}
