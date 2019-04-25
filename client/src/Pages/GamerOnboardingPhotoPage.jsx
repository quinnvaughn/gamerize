import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Image } from 'cloudinary-react'
import { withRouter } from 'react-router-dom'

//local imports
import NavBar from '../Components/NavBar'
import Loading from '../Components/Loading'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  @media (min-width: 744px) {
    max-width: 696px;
  }
  @media (min-width: 1128px) {
    max-width: 1080px;
  }
  margin: 0 auto;
  width: auto;
  padding-right: 2.4rem;
  padding-left: 2.4rem;
`

const AddInfo = styled.div`
  padding-top: 9.6rem;
  padding-bottom: 8rem;
  border-bottom: 1px solid #dddfe2;
`

const LetsAdd = styled.div`
  font-size: 6rem;
  line-height: 6.4rem;
  letter-spacing: -2.5px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
`

const Container = styled.div`
  border: 1px solid #ebebeb;
  margin-bottom: 2rem;
`

const Top = styled.div`
  width: 100%;
  background: #ebebeb;
  padding: 1.2rem 2rem;
`

const Title = styled.h2`
  font-weight: 400;
`

const Body = styled.div`
  padding: 2rem;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 0.5rem;
`

const RowLeft = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  padding-right: 0.8rem;
`

const Label = styled.label`
  padding: 0.9rem 2.7rem;
  border: 1px solid #db1422;
  border-radius: 4px;
  font-size: 1.6rem;
  color: #db1422;
  cursor: pointer;
  width: 100%;
`

const RowRight = styled.div`
  flex: 75%;
  position: ${props => props.relative && 'relative'};
`

const Next = styled.button`
  color: #fff;
  text-decoration: none;
  outline: 0;
  border: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  padding: 1rem 2.2rem;
  background: ${props => (props.disabled ? '#dddfe2' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
`

const NextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const UploadingAPicture = styled.div`
  font-size: 1.6rem;
  margin-bottom: 3rem;
`

const FileUpload = styled.input`
  display: none;
`

const BannerLeft = styled.div`
  display: flex;
  align-items: center;
  padding-right: 1.5rem;
`

const BannerRight = styled.div`
  flex: 100%;
`

const GET_INFO = gql`
  {
    me {
      id
      name
      aboutMe
      gender
      profilePicture
      banner
    }
  }
`

const UPLOAD_PROFILE_PICTURE = gql`
  mutation($file: Upload!) {
    uploadProfilePicture(file: $file) {
      updated
    }
  }
`

const UPLOAD_BANNER = gql`
  mutation($file: Upload!) {
    uploadBanner(file: $file) {
      updated
    }
  }
`
function GamerOnboardingPhotosPage(props) {
  const [disabled, setDisabled] = useState(true)
  const { data, loading, refetch } = useQuery(GET_INFO)
  const uploadProfilePicture = useMutation(UPLOAD_PROFILE_PICTURE)
  const uploadBanner = useMutation(UPLOAD_BANNER)
  return loading ? (
    <Loading />
  ) : (
    <PageContainer>
      <NavBar />
      <Content>
        <AddInfo>
          <LetsAdd>You need a photo first</LetsAdd>
          <Container>
            <Top>
              <Title>Required</Title>
            </Top>
            <Body>
              <Row>
                <RowLeft>
                  <Image
                    publicId={`${data.me.profilePicture}`}
                    width="225"
                    crop="scale"
                  />
                </RowLeft>
                <RowRight>
                  <UploadingAPicture>
                    Users are more likely to play with someone if they can put a
                    face to a voice. Please make sure you have a profile
                    picture.
                  </UploadingAPicture>
                  <Label>
                    Upload Profile Picture
                    <FileUpload
                      type="file"
                      onChange={async e => {
                        const { data } = await uploadProfilePicture({
                          variables: { file: e.target.files[0] },
                        })
                        if (data.uploadProfilePicture.updated) {
                          setDisabled(false)
                          refetch()
                        }
                      }}
                    />
                  </Label>
                </RowRight>
              </Row>
            </Body>
          </Container>
          <Container>
            <Top>
              <Title>Optional</Title>
            </Top>
            <Body>
              <Row>
                <BannerLeft>
                  <Image
                    publicId={`${data.me.banner}`}
                    width="300"
                    crop="scale"
                  />
                </BannerLeft>
                <BannerRight>
                  <UploadingAPicture>
                    Banners are a great way to promote yourself as a gamer.
                  </UploadingAPicture>
                  <Label>
                    Upload Banner
                    <FileUpload
                      type="file"
                      onChange={async e => {
                        const { data } = await uploadBanner({
                          variables: { file: e.target.files[0] },
                        })
                        if (data.uploadBanner.updated) {
                          refetch()
                        }
                      }}
                    />
                  </Label>
                </BannerRight>
              </Row>
            </Body>
          </Container>
          <NextContainer>
            <Next
              disabled={disabled}
              onClick={async () => {
                await props.history.push('/gamer-onboarding/info')
              }}
            >
              Next
            </Next>
          </NextContainer>
        </AddInfo>
      </Content>
    </PageContainer>
  )
}

export default withRouter(GamerOnboardingPhotosPage)
