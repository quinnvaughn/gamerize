import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Badge = styled.span`
  display: inline-block;
  position: absolute;
  min-width: 1rem;
  padding: 0.3rem 0.7rem;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background: #f10e0e;
  border-radius: 10px;
  top: -14px;
  right: -10px;
`

export default function NotificationBadge(props) {
  const value = props.count > 0 ? <Badge>{props.count}</Badge> : null
  return <Container>{value}</Container>
}
