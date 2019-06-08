import React from 'react'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'

//local imports
import { formatLauncher } from '../utils/System'
import { mapTags } from '../utils/Strings'

const Container = styled.div`
  margin-right: 5rem;
  width: 40rem;
`

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 0.5rem;
`

const Launcher = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-top: 0.5rem;
`

const TagsContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.span`
  padding: 0.5rem;
  background: #db1422;
  border-radius: 4px;
  font-weight: 600;
  color: #fff;
  display: inline-flex;
  font-size: 1.4rem;
  margin-right: 0.5rem;
`

const NumSessions = styled.div`
  font-size: 1.4rem;
  margin-top: 0.5rem;
`

export default function AdminGame(props) {
  return (
    <Container>
      <Image publicId={props.picture} width="100%" height="300" />
      <Title>{props.name}</Title>
      <TagsContainer>
        {props.tags.map(tag => (
          <Tag>{mapTags(tag)}</Tag>
        ))}
      </TagsContainer>
      <NumSessions>
        {props.numSessions} {props.numSessions === 1 ? 'Session' : 'Sessions'}
      </NumSessions>
    </Container>
  )
}