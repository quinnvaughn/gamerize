import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import _ from 'lodash'
import { Image } from 'cloudinary-react'

//local imports
import EditProfileNav from '../Components/EditProfileNav'
import NavBar from '../Components/NavBar'
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

const OutsideContainer = styled.div`
  flex: 75%;
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
  flex: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  padding-right: 1.5rem;
`

const RowRight = styled.div`
  flex: 75%;
  position: ${props => props.relative && 'relative'};
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

export default function GamerDashboardAccountEdit(props) {
  const { data, loading, refetch } = useQuery(GET_INFO)
  const uploadProfilePicture = useMutation(UPLOAD_PROFILE_PICTURE)
  return loading ? (
    <Loading />
  ) : (
    <PageContainer>
      <NavBar />
      <Content>
        <EditProfileNav />
        <OutsideContainer>
          <Container>
            <Top>
              <Title>Photos</Title>
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
                    Uploading a profile picture is a great way to make the games
                    feel more comfortable for you and the gamers.
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
      </Content>
    </PageContainer>
  )
}
