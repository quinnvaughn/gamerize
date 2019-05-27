import React from 'react'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'

const TitleContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`

const Img = styled(Image)``

export default function Jumbotron(props) {
  return (
    <TitleContainer>
      <Img
        crop="scale"
        width="100%"
        publicId="https://res.cloudinary.com/gamerize/image/upload/v1555813486/gamerize_jumbotron.jpg"
        alt="Gaming Jumbotron"
      />
    </TitleContainer>
  )
}
