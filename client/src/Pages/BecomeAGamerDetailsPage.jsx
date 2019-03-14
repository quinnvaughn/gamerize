import React from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import { withRouter, Link } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { useMutation } from 'react-apollo-hooks'
import _ from 'lodash'
import gql from 'graphql-tag'

//local imports
import Gamer from '../Containers/BecomeAGamerContainer'
import ProgressNav from '../Components/ProgressNav'
import useTitle from '../Hooks/useTitle'
import { objectIsEmpty } from '../utils/Objects'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  max-width: 91.2rem;
  margin: 0 auto;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  padding-top: 7rem;
  margin-bottom: 9rem;
`

const Container = styled.div`
  width: 60%;
  padding: 3rem 3rem 1.6rem;
  height: 100%;
  position: relative;
`

const Title = styled.div`
  word-wrap: break-word;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.75em;
`

const Subtitle = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.5em;
  margin-bottom: 2rem;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const InputLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.color};
`

const Input = styled.input`
  padding: 1rem 0;
  padding-left: 1rem;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  :focus {
    outline: none;
  }
`

const Previous = styled(Link)`
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const PreviousText = styled.span`
  color: #f10e0e;
  font-size: 1.6rem;
  font-weight: 600;
`

const PreviousArrow = styled(FaChevronLeft)`
  color: #f10e0e;
  font-size: 1.6rem;
  margin-right: 0.5rem;
`

const Finish = styled.button`
  color: #fff;
  text-decoration: none;
  outline: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  cursor: pointer;
  font-weight: 600;
  padding: 1rem 2.2rem;
  background: ${props => (props.disabled ? '#dddfe2' : '#f10e0e')};
  pointer-events: ${props => props.disabled && 'none'};
  border: none;
  :focus {
    outline: none;
  }
`

const ButtonsContainer = styled.div`
  position: fixed;
  z-index: 200;
  bottom: 0;
  left: 0;
  width: 100%;
`

const ButtonsInner = styled.div`
  max-width: 91.2rem;
  margin: 0 auto;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
`

const Buttons = styled.div`
  background: #fff;
  border-top: 1px solid #dddfe2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 3rem 1.6rem;
  width: 60%;
`

const CREATE_GAMER_REQUEST = gql`
  mutation($input: CreateGamerRequestInput!) {
    createGamerRequest(input: $input) {
      created
    }
  }
`

function BecomeAGamerDetails(props) {
  useTitle('Let us know who you are')
  const createGamerRequest = useMutation(CREATE_GAMER_REQUEST)
  return (
    <Subscribe to={[Gamer]}>
      {container => (
        <PageContainer>
          <ProgressNav />
          <Content>
            <Container>
              <Title>Your links</Title>
              <Subtitle>
                We require at least one of these to know you have a sizable
                enough presence on the internet to reach out to fans.
              </Subtitle>
              <InputContainer>
                <InputLabel color="#38A1F3">Twitter</InputLabel>
                <Input
                  placeholder="Link"
                  value={container.state.socialMedia.twitter}
                  name="twitter"
                  onChange={e =>
                    container.setSocialMedia(e.target.name, e.target.value)
                  }
                />
              </InputContainer>
              <InputContainer>
                <InputLabel color="#4267b2">Facebook Page</InputLabel>
                <Input
                  placeholder="Link"
                  value={container.state.socialMedia.facebook}
                  name="facebook"
                  onChange={e =>
                    container.setSocialMedia(e.target.name, e.target.value)
                  }
                />
              </InputContainer>
              <InputContainer>
                <InputLabel color="#ED3833">Youtube</InputLabel>
                <Input
                  placeholder="Link"
                  value={container.state.socialMedia.youtube}
                  name="youtube"
                  onChange={e =>
                    container.setSocialMedia(e.target.name, e.target.value)
                  }
                />
              </InputContainer>
              <InputContainer>
                <InputLabel color="#C13584">Instagram</InputLabel>
                <Input
                  placeholder="Link"
                  value={container.state.socialMedia.instagram}
                  name="instagram"
                  onChange={e =>
                    container.setSocialMedia(e.target.name, e.target.value)
                  }
                />
              </InputContainer>
              <InputContainer>
                <InputLabel color="#6441a5">Twitch</InputLabel>
                <Input
                  placeholder="Link"
                  value={container.state.socialMedia.twitch}
                  name="twitch"
                  onChange={e =>
                    container.setSocialMedia(e.target.name, e.target.value)
                  }
                />
              </InputContainer>
              <InputContainer>
                <InputLabel color="#fdd835">Snapchat</InputLabel>
                <Input
                  placeholder="Story Views"
                  value={container.state.socialMedia.snapchat}
                  name="snapchat"
                  onChange={e =>
                    container.setSocialMedia(e.target.name, e.target.value)
                  }
                />
              </InputContainer>
            </Container>
            <ButtonsContainer>
              <ButtonsInner>
                <Buttons>
                  <Previous to="/become-a-gamer/background">
                    <PreviousArrow />
                    <PreviousText>Previous</PreviousText>
                  </Previous>
                  <Finish
                    disabled={objectIsEmpty(container.state.socialMedia)}
                    onClick={async () => {
                      const input = { ...container.state }
                      await createGamerRequest({
                        variables: {
                          input,
                        },
                      })
                      props.history.push('/become-a-gamer/finished')
                    }}
                  >
                    Finish
                  </Finish>
                </Buttons>
              </ButtonsInner>
            </ButtonsContainer>
          </Content>
        </PageContainer>
      )}
    </Subscribe>
  )
}

export default withRouter(BecomeAGamerDetails)
