import React, { Fragment } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Media from 'react-media'
import StarRatings from 'react-star-ratings'

//local imports
import NavBar from '../Components/NavBar'
import DefaultAvatar from '../default-avatar.png'
import SmallSession from '../Components/SmallSession'
import GamerAvailability from '../Components/GamerAvailability'
import UserProfileReviews from '../Components/UserProfileReviews'
import DefaultBanner from '../default-banner.png'
import { noSpaces } from '../utils/Strings'
import FavoriteGame from '../Components/FavoriteGame'
import useTitle from '../Hooks/useTitle'

//data
import specificSessions from '../data/specificusersessions'
import gamers from '../data/gamers'
import reviews from '../data/reviews'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100%;
  padding-bottom: 6rem;
`

const GlobalStyle = createGlobalStyle`
    .navbar {
        position: relative;
        border-bottom: none;
    }
`

const Content = styled.div`
  font-size: 1.6rem;
  margin: 0 auto;
  margin-top: 2rem !important;
  display: flex

  width: 100%;
  @media (max-width: 1127px) {
    flex-direction: column;
  }
  @media (min-width: 744px) {
    max-width: 696px;
    margin: 0 auto;
    width: auto;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }
  @media (min-width: 1128px) {
    max-width: 108rem;
  }
`

const LeftSide = styled.div`
  flex: 1;
  padding: 0 0.8rem;
`

const RightSide = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 744px) {
    padding: 0;
  }
  @media (min-width: 1128px) {
    padding-left: 8.8rem;
    padding-right: 0.8rem;
  }
`

const ProfilePicture = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
`

const ProfilePictureContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid #dddfe2;
`

const ProfileInfoContainer = styled.div`
  padding: 2.4rem;
  border-radius: 4px;
  border: 1px solid #dddfe2;
`

const Name = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  line-height: 4rem;
`

const Occupations = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
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
  :hover {
    cursor: default;
  }
`

const AboutMe = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  padding-top: 2.4rem;
`

const AboutMeParagraph = styled.p`
  word-wrap: break-word;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
  padding-bottom: 2.4rem;
  border-bottom: 1px solid #dddfe2;
`

const FavoriteGames = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.4rem 0;
  border-bottom: 1px solid #dddfe2;
`

const FavoriteGameContainer = styled.div`
  display: flex;
  margin-left: -0.8rem;
  margin-right: -0.8rem;
  flex-wrap: wrap;
`

const FavoriteGamesTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  flex: 1;
  margin-bottom: 1rem;
`

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-top: 2rem;
`

const NumReviews = styled.span`
  font-size: 1.6rem;
  line-height: 1.375em;
  font-weight: 400;
  margin-bottom: 1rem;
`

const ReviewRatingContainer = styled.div``

const ReviewRating = styled.span`
  margin-left: 0.5rem;
  font-size: 1.4rem;
  font-weight: 400;
`

const Sessions = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.4rem 0;
  border-bottom: 1px solid #dddfe2;
`

const SessionsMapped = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const SessionsTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  flex: 1;
  margin-bottom: 1rem;
`

const Username = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const BannerContainer = styled.div`
  height: 40rem;
`

const Banner = styled.img`
  width: 100%;
  max-height: 40rem;
`

const NegativeMargins = styled.div`
  margin-left: -0.8rem;
  margin-right: -0.8rem;
`

const SmallContainer = styled.div`
  padding-top: 2rem;
  display: flex;
`

const SmallLeft = styled.div`
  flex: 80%;
`

const SmallRight = styled.div`
  flex: 20%;
`

export default function UserProfile(props) {
  //will be done with Prisma with backend.
  const user = _.find(gamers, {
    username: noSpaces(props.match.params.user),
  })
  useTitle(`${user.name} - Gamerize`)
  return (
    <PageContainer>
      <NavBar />
      <GlobalStyle />
      <BannerContainer>
        <Banner src={DefaultBanner} alt="Banner" />
      </BannerContainer>
      <Content>
        <Media query={{ maxWidth: 1127 }}>
          {matches =>
            matches ? null : (
              <LeftSide>
                <ProfileInfoContainer>
                  <ProfilePictureContainer>
                    <ProfilePicture src={DefaultAvatar} alt="Profile Picture" />
                  </ProfilePictureContainer>
                  <ReviewsContainer>
                    <NumReviews>{`${user.numReviews} reviews`}</NumReviews>
                    <ReviewRatingContainer>
                      <StarRatings
                        rating={user.reviews}
                        starRatedColor="#f10e0e"
                        numberOfStars={5}
                        name="rating"
                        starDimension="14px"
                        starSpacing="1px"
                      />
                      <ReviewRating>{`(${user.reviews})`}</ReviewRating>
                    </ReviewRatingContainer>
                  </ReviewsContainer>
                </ProfileInfoContainer>
              </LeftSide>
            )
          }
        </Media>
        <RightSide>
          <Media query={{ maxWidth: 1127 }}>
            {matches =>
              matches ? (
                <SmallContainer>
                  <SmallLeft>
                    <Name>{user.name}</Name>
                    <Username>@{user.username}</Username>
                    <Occupations>
                      {user.occupations.map(job => (
                        <Occupation>{job}</Occupation>
                      ))}
                    </Occupations>
                  </SmallLeft>
                  <SmallRight>
                    <ProfilePicture src={DefaultAvatar} alt="Profile Picture" />
                  </SmallRight>
                </SmallContainer>
              ) : (
                <Fragment>
                  <Name>{user.name}</Name>
                  <Username>@{user.username}</Username>
                  <Occupations>
                    {user.occupations.map(job => (
                      <Occupation>{job}</Occupation>
                    ))}
                  </Occupations>
                </Fragment>
              )
            }
          </Media>
          <AboutMe>About me</AboutMe>
          <AboutMeParagraph>{user.aboutMe}</AboutMeParagraph>
          <FavoriteGames>
            <FavoriteGamesTitle>Favorite games</FavoriteGamesTitle>
            <FavoriteGameContainer>
              {_.map(user.favoriteGames, game => (
                <FavoriteGame game={game} />
              ))}
            </FavoriteGameContainer>
          </FavoriteGames>
          <Sessions>
            <SessionsTitle>{`Gaming sessions`}</SessionsTitle>
            <NegativeMargins>
              <SessionsMapped>
                {_.map(specificSessions, session => (
                  <SmallSession
                    title={session.title}
                    key={session.game}
                    username={user.username}
                    game={session.game}
                    name={session.name}
                    systems={session.systems}
                    price={session.price}
                    reviews={session.reviews}
                    numReviews={session.numReviews}
                  />
                ))}
              </SessionsMapped>
            </NegativeMargins>
          </Sessions>
          <GamerAvailability
            day={new Date()}
            name={user.name}
            username={user.username}
          />
          <UserProfileReviews
            reviews={reviews}
            name={user.name}
            username={user.username}
          />
        </RightSide>
      </Content>
    </PageContainer>
  )
}
