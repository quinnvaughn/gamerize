import React from 'react'
import styled from 'styled-components'
import { mapTags } from '../utils/Strings'

const Tags = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
  margin-bottom: 3rem;
`

const Tag = styled.div`
  padding: 0.5rem;
  background: #db1422;
  border-radius: 4px;
  font-weight: 600;
  color: #fff;
  display: inline-flex;
  font-size: 1.4rem;
  margin-right: 0.5rem;
`

export default function TagList(props) {
  return (
    <Tags>
      {props.tags.map(tag => (
        <Tag>{mapTags(tag)}</Tag>
      ))}
    </Tags>
  )
}
