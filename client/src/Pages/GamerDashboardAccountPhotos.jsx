import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Image } from 'cloudinary-react'

import GamerDashboardAccountNav from '../Components/GamerDashboardAccountNav'
import GamerDashboardNav from '../Components/GamerDashboardNav'
import Loading from '../Components/Loading'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  width: 100%;
  max-width: 108rem;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 4rem;
  margin-bottom: 9rem;
  display: flex;
`

const Sections = styled.div`
  flex: 75%;
`

const OutsideContainer = styled.div`
  margin-bottom: 2rem;
`

const Container = styled.div`
  border: 1px solid #ebebeb;
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
`

const RowLeft = styled.div`
  flex: 25%;
  display: flex;
  align-items: center;
  padding-right: 1.5rem;
`

const RowRight = styled.div`
  flex: 75%;
`

const BannerLeft = styled.div`
  flex: 50%;
  display: flex;
  align-items: center;
  padding-right: 1.5rem;
`

const BannerRight = styled.div`
  flex: 50%;
`

const UploadingAPicture = styled.div`
  font-size: 1.6rem;
  margin-bottom: 3rem;
`

const FileUpload = styled.input`
  display: none;
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

export default function GamerDashboardAccountPhotos(props) {
  const { data, loading, refetch } = useQuery(GET_INFO)
  const uploadProfilePicture = useMutation(UPLOAD_PROFILE_PICTURE)
  const uploadBanner = useMutation(UPLOAD_BANNER)
  return loading ? (
    <Loading />
  ) : (
    <PageContainer>
      <GamerDashboardNav />
      <Content>
        <GamerDashboardAccountNav />
        <Sections>
          <OutsideContainer>
            <Container>
              <Top>
                <Title>Profile Picture</Title>
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
                      Users are more likely to play with someone if they can put
                      a face to a voice. Please make sure you have a profile
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
                            refetch()
                          }
                        }}
                      />
                    </Label>
                  </RowRight>
                </Row>
              </Body>
            </Container>
          </OutsideContainer>
          <OutsideContainer>
            <Container>
              <Top>
                <Title>Banner</Title>
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
          </OutsideContainer>
        </Sections>
      </Content>
    </PageContainer>
  )
}
