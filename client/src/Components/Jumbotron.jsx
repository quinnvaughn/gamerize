import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'
import { useQuery } from 'react-apollo-hooks'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import Media from 'react-media'

const TitleContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`

const SignUpButton = styled(Link)`
  position: absolute;
  top: 40%;
  right: 10%;
  background: #fff;
  border-radius: 4px;
  color: #db1422;
  cursor: pointer;
  font-weight: 600;
  font-size: 2.4rem;
  text-decoration: none;
  padding: 1rem 2rem;
  :visited {
    color: #db1422;
  }
`

const Img = styled(Image)``

const GET_ME = gql`
  {
    me {
      id
    }
  }
`

export default function Jumbotron(props) {
  const token = localStorage.getItem('TOKEN')
  const { data, loading, refetch } = useQuery(GET_ME)
  useEffect(() => {
    refetch()
  }, [token])
  const loggedIn = !loading && data && !_.isEmpty(data.me)
  return (
    <TitleContainer>
      <Img
        dpr="auto"
        responsive
        crop="scale"
        width="100%"
        publicId="https://res.cloudinary.com/gamerize/image/upload/v1559006952/jumbotron_2.jpg"
        alt="Gaming Jumbotron"
      />
      <Media query={{ maxWidth: 720 }}>
        {matches =>
          matches &&
          !loggedIn && <SignUpButton to="/sign-up">Sign up</SignUpButton>
        }
      </Media>
    </TitleContainer>
  )
}
