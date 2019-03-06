import React from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'

//local imports
import DefaultAvatar from '../default-avatar.png'

const Container = styled.div`
  padding-bottom: 2.4rem;
  border-bottom: 1px solid #dddfe2;
  overflow-wrap: break-word;
  margin-bottom: 2.4rem;
`

const ReviewTop = styled.div`
  display: flex;
  align-items: center;
`

const ReviewerNameAndDate = styled.div`
  margin-left: 1.6rem;
  display: flex;
  flex-direction: column;
`

const ReviewerName = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.2rem;
`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: hidden;
  width: 4.8rem;
  height: 4.8rem;
`

const Date = styled.div`
  overflow-wrap: break-word;
  font-size: 1.4rem;
  font-weight: 400;
`

const ReviewText = styled.div`
  font-size: 1.6rem;
  margin-top: 1.6rem;
  line-height: 2.2rem;
  font-weight: 400;
  overflow-wrap: wrap;
`

export default function Review({ review }) {
  const dateFormat = 'MMMM YYYY'
  return (
    <Container>
      <ReviewTop>
        <Avatar src={DefaultAvatar} />
        <ReviewerNameAndDate>
          <ReviewerName>{review.user}</ReviewerName>
          <Date>{dateFns.format(review.date, dateFormat)}</Date>
        </ReviewerNameAndDate>
      </ReviewTop>
      <ReviewText>{review.text}</ReviewText>
    </Container>
  )
}
