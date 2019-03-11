import React from 'react'
import styled from 'styled-components'

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 66.6667%;
  position: relative;
  background-size: 100% 100%;
`

const ImageSecond = styled.div`
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  height: 100% !important;
  width: 100% !important;
`

const ImageThird = styled.div`
  width: 100%;
  height: 100%;
  position: relative !important;
`

const Image = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  background-size: cover !important;
  background-position: 50% 50% !important;
  background-repeat: no-repeat !important;
  height: 100%;
  width: 100%;
  background-image: url(${props => props.src});
`

export default function DynamicImage(props) {
  return (
    <ImageContainer>
      <ImageSecond>
        <ImageThird>
          <Image src={props.src} alt={props.alt} />
        </ImageThird>
      </ImageSecond>
    </ImageContainer>
  )
}
