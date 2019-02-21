import React from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'

//local imports
import reviews from '../data/reviews'
import DefaultAvatar from '../default-avatar.png'
import dateFns from 'date-fns'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 2.4rem;
  border-bottom: 1px solid #dddfe2;
  margin-bottom: 2.4rem;
  z-index: -1;
`

const NumReviewsAndSearch = styled.div`
  width: 100%;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
`

const NumReviews = styled.div`
  flex: 50%;
  font-size: 2.4rem;
`

const SearchContainer = styled.div`
  flex: 50%;
`

const Search = styled.input``

const ReviewsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Review = styled.div`
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

export default function Reviews(props) {
  const dateFormat = 'MMMM YYYY'
  return (
    <Container>
      <Top>
        <NumReviewsAndSearch>
          <NumReviews>{props.numReviews} Reviews</NumReviews>
          <SearchContainer>
            <Search type="text" placeholder="Search Reviews" />
          </SearchContainer>
        </NumReviewsAndSearch>
        <StarRatings
          rating={props.reviews}
          starRatedColor="red"
          numberOfStars={5}
          name="rating"
          starDimension="1.8rem"
          starSpacing=".3rem"
          style={{ zIndex: '-1' }}
        />
      </Top>
      <ReviewsContainer>
        {reviews.map(review => (
          <Review>
            <ReviewTop>
              <Avatar src={DefaultAvatar} />
              <ReviewerNameAndDate>
                <ReviewerName>{review.user}</ReviewerName>
                <Date>{dateFns.format(review.date, dateFormat)}</Date>
              </ReviewerNameAndDate>
            </ReviewTop>
            <ReviewText>{review.text}</ReviewText>
          </Review>
        ))}
      </ReviewsContainer>
    </Container>
  )
}
