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
  height: 100px;
  width: 100px;
`

const Name = styled.h4`
  font-size: 18px;

  margin-bottom: 3px;
`

const Systems = styled.p`
  font-size: 14px;
  color: black;
  font-weight: 400;
`

const System = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: black;
`

const Price = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: black;
`

const NumRatings = styled.span`
  margin-left: 5px;
  color: black;
  font-size: 12px;
`
const Rating = styled.span`
  margin-right: 5px;
  font-size: 12px;
  color: black;
`

const StyledLink = styled(Link)`
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
