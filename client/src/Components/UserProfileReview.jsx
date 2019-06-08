import React from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'
import { Link } from 'react-router-dom'

//local imports
import DefaultAvatar from '../default-avatar.png'
import { noSpaces } from '../utils/Strings'

const Container = styled.div`
  padding-bottom: 2.4rem;
  border-bottom: 1px solid #dddfe2;
  overflow-wrap: break-word;
  margin-bottom: 2.4rem;
`

const ReviewTop = styled.div`
  display: flex;
  flex-direction: column;
`

const GameAndDate = styled.div`
  display: flex;
  flex-direction: column;
`

const ReviewerName = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.2rem;
  margin-left: 1.6rem;
`

const ReviewerNameContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NameAndAvatar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
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
  font-weight: 600;
  cursor: default;
`

const ReviewText = styled.div`
  font-size: 1.6rem;
  margin-top: 1.6rem;
  line-height: 2.2rem;
  font-weight: 400;
  overflow-wrap: wrap;
`

const WhichGame = styled(Link)`
  text-decoration: none;
  color: #767676;
  font-weight: 400;
  cursor: pointer;
  font-size: 1.4rem;
  margin-bottom: 1.6rem;
  :hover {
    text-decoration: underline;
  }
`

const AvatarLink = styled(Link)``

const UserProfileReview = React.memo(function UserProfileReview({
  review,
  name,
  username,
}) {
  const dateFormat = 'MMMM YYYY'
  return (
    <Container>
      <ReviewTop>
        <GameAndDate>
          <WhichGame to={`/users/${username}/${noSpaces(review.game)}`}>
            {`Played ${review.game} with ${name}`}
          </WhichGame>
          <Date>{dateFns.format(review.date, dateFormat)}</Date>
        </GameAndDate>
        <ReviewText>{review.text}</ReviewText>
      </ReviewTop>
      <NameAndAvatar>
        <AvatarLink to={`/users/${review.username}`}>
          <Avatar src={DefaultAvatar} />
        </AvatarLink>
        <ReviewerNameContainer>
          <ReviewerName>{review.user}</ReviewerName>
        </ReviewerNameContainer>
      </NameAndAvatar>
    </Container>
  )
})
export default UserProfileReview
