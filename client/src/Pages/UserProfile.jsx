import React, { Fragment } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import _ from 'lodash'
import gql from 'graphql-tag'
import Media from 'react-media'
import StarRatings from 'react-star-ratings'

//local imports
import NavBar from '../Components/NavBar'
import DefaultAvatar from '../default-avatar.png'
import SmallSession from '../Components/SmallSession'
import GamerAvailability from '../Components/GamerAvailability'
import UserProfileReviews from '../Components/UserProfileReviews'
import DefaultBanner from '../default-banner.png'
import { noSpaces, capitalize } from '../utils/Strings'
import FavoriteGame from '../Components/FavoriteGame'
import useTitle from '../Hooks/useTitle'
import AddFriendButton from '../Components/AddFriendButton'
import Loading from '../Components/Loading'

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
  max-height: 50rem;
`

const Banner = styled.img`
  width: 100%;
  max-height: 50rem;
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

const Flex20 = styled.div`
  flex: 20%;
  text-align: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const GET_USER = gql`
  query($username: String!) {
    getUser(username: $username) {
      name
      aboutMe
      username
      numReviews
      areWeFriends
      profilePicture
      banner
      role
      sentFriendRequest
      sentMeAFriendRequest
      reviewRating
      occupations
      reviews {
        text
      }
      mostPlayedGames {
        name
      }
      sessions {
        id
        title
        game {
          name
        }
        system
        price
        reviews {
          text
        }
        reviewRating
        numReviews
      }
    }
  }
`

const GET_ME = gql`
  {
    me {
      username
    }
  }
`

export default function UserProfile(props) {
  const { data, loading, refetch } = useQuery(GET_USER, {
    variables: { username: props.match.params.user },
  })
  const { data: secondData, loading: secondLoading } = useQuery(GET_ME)
  useTitle(`User Profile - Gamerize`)
  return loading || secondLoading ? (
    <Loading />
  ) : (
    <PageContainer>
      <NavBar />
      <GlobalStyle />
      <BannerContainer>
        <Banner src={data.getUser.banner} alt="Banner" />
      </BannerContainer>
      <Content>
        <Media query={{ maxWidth: 1127 }}>
          {matches =>
            matches ? null : (
              <LeftSide>
                <ProfileInfoContainer>
                  <ProfilePictureContainer>
                    <ProfilePicture
                      src={data.getUser.profilePicture}
                      alt="Profile Picture"
                    />
                  </ProfilePictureContainer>
                  {/* <ReviewsContainer>
                    <NumReviews>{`${
                      data.getUser.numReviews
                    } reviews`}</NumReviews>
                    <ReviewRatingContainer>
                      <StarRatings
                        rating={data.getUser.reviewRating}
                        starRatedColor="#db1422"
                        numberOfStars={5}
                        name="rating"
                        starDimension="14px"
                        starSpacing="1px"
                      />
                      <ReviewRating>{`(${
                        data.getUser.reviewRating
                      })`}</ReviewRating>
                    </ReviewRatingContainer>
                  </ReviewsContainer> */}
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
                    <Name>{data.getUser.name}</Name>
                    <Username>@{data.getUser.username}</Username>
                    <Occupations>
                      {data.getUser.occupations.map(job => (
                        <Occupation key={job}>{capitalize(job)}</Occupation>
                      ))}
                    </Occupations>
                  </SmallLeft>
                  <SmallRight>
                    <ProfilePicture src={DefaultAvatar} alt="Profile Picture" />
                  </SmallRight>
                </SmallContainer>
              ) : (
                <Fragment>
                  <Row>
                    <SmallLeft>
                      <Name>{data.getUser.name}</Name>
                      <Username>@{data.getUser.username}</Username>
                    </SmallLeft>
                    {secondData.me &&
                      secondData.me.username !== data.getUser.username && (
                        <Flex20>
                          <AddFriendButton
                            pending={data.getUser.sentFriendRequest}
                            respond={data.getUser.sentMeAFriendRequest}
                            refetch={refetch}
                            friends={data.getUser.areWeFriends}
                            username={props.match.params.user}
                          />
                        </Flex20>
                      )}
                  </Row>
                  <Occupations>
                    {data.getUser.occupations.map(job => (
                      <Occupation key={job}>{capitalize(job)}</Occupation>
                    ))}
                  </Occupations>
                </Fragment>
              )
            }
          </Media>
          <AboutMe>About me</AboutMe>
          <AboutMeParagraph>{data.getUser.aboutMe}</AboutMeParagraph>
          <FavoriteGames>
            <FavoriteGamesTitle>Most played games</FavoriteGamesTitle>
            <FavoriteGameContainer>
              {_.map(data.getUser.mostPlayedGames, game => (
                <FavoriteGame game={game.name} key={game.name} />
              ))}
            </FavoriteGameContainer>
          </FavoriteGames>
          {data.getUser.role === 'GAMER' && (
            <Sessions>
              <SessionsTitle>{`Gaming sessions`}</SessionsTitle>
              <NegativeMargins>
                <SessionsMapped>
                  {_.map(data.getUser.sessions, (session, index) => (
                    <SmallSession
                      id={session.id}
                      title={session.title}
                      key={session.game.name + index}
                      username={data.getUser.username}
                      game={noSpaces(session.game.name)}
                      name={session.game.name}
                      system={session.system}
                      price={session.price}
                      reviewRating={session.reviewRating}
                      numReviews={session.numReviews}
                    />
                  ))}
                </SessionsMapped>
              </NegativeMargins>
            </Sessions>
          )}
        </RightSide>
      </Content>
    </PageContainer>
  )
}

{
  /* <GamerAvailability
            day={new Date()}
            name={data.getUser.name}
            username={data.getUser.username}
          />
          <UserProfileReviews
            reviews={data.getUser.reviews}
            name={data.getUser.name}
            username={data.getUser.username}
          /> */
}
