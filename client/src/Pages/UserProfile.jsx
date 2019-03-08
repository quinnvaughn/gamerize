import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import StarRatings from 'react-star-ratings'

//local imports
import NavBar from '../Components/NavBar'
import DefaultAvatar from '../default-avatar.png'
import DefaultGame from '../default-game.gif'
import SmallSession from '../Components/SmallSession'
import GamerAvailability from '../Components/GamerAvailability'
import UserProfileReviews from '../Components/UserProfileReviews'
import DefaultBanner from '../default-banner.png'

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
  max-width: 108rem;
  font-size: 1.6rem;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  width: 100%;
`

const LeftSide = styled.div`
  flex: 1;
  padding: 0 0.8rem;
`

const RightSide = styled.div`
  flex: 2;
  padding-left: 8.8rem;
  padding-right: 0.8rem;
  display: flex;
  flex-direction: column;
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
`

const FavoriteGame = styled(Link)`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-decoration: none;
  color: black;
  font-size: 1.8rem;
  font-weight: 700;
  :hover {
    color: #f10e0e;
  }
`

const FavoriteGameTitle = styled.span`
  font-size: 1.6rem;
  margin-top: 0.5rem;
`

const FavoriteGamesTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  flex: 1;
  margin-bottom: 1rem;
`

const GamePicture = styled.img`
  width: 10rem;
  height: 12rem;
  border-radius: 4px;
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

const noSpaces = string => string.replace(/ /g, '_')

export default function UserProfile(props) {
  //will be done with Prisma with backend.
  const user = _.find(gamers, {
    username: noSpaces(props.match.params.user),
  })
  return (
    <PageContainer>
      <NavBar />
      <GlobalStyle />
      <BannerContainer>
        <Banner src={DefaultBanner} alt="Banner" />
      </BannerContainer>
      <Content>
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
        <RightSide>
          <Name>{user.name}</Name>
          <Username>@{user.username}</Username>
          <Occupations>
            {user.occupation.map(job => (
              <Occupation>{job}</Occupation>
            ))}
          </Occupations>
          <AboutMe>About Me</AboutMe>
          <AboutMeParagraph>{user.aboutMe}</AboutMeParagraph>
          <FavoriteGames>
            <FavoriteGamesTitle>Favorite Games</FavoriteGamesTitle>
            <FavoriteGameContainer>
              {_.map(user.favoriteGames, game => (
                <FavoriteGame to={`/games/${noSpaces(game)}`}>
                  <GamePicture src={DefaultGame} alt={game} />
                  <FavoriteGameTitle>{game}</FavoriteGameTitle>
                </FavoriteGame>
              ))}
            </FavoriteGameContainer>
          </FavoriteGames>
          <Sessions>
            <SessionsTitle>{`Gaming Sessions`}</SessionsTitle>
            <NegativeMargins>
              <SessionsMapped>
                {_.map(specificSessions, session => (
                  <SmallSession
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
