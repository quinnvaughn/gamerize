import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

// local imports
import User from './User'

const RowTitle = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  width: 100%;
  display: block;
  cursor: default;
  padding-left: 0.8rem;
`

const Container = styled.div`
  min-height: 20rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`

const AllTheGamers = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`

const ShowAllContainer = styled.div`
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
`

const ShowAll = styled(Link)`
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 0.8rem;
  color: #db1422;
  font-size: 1.6rem;
  text-decoration: none;
  align-self: flex-start;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const ShowAllRight = styled(FaChevronRight)`
  width: 1rem;
  height: 1rem;
  color: #db1422;
  margin-left: 0.1rem;
`

// will do this different way with graphql but just to show 'Show All' do it this way for now.

const map = users => {
  return users.map(({ user }, index) => {
    return (
      <User
        username={user.username}
        name={user.displayName}
        profilePicture={user.profilePicture}
        gamer={user.role === 'GAMER'}
        numSessions={user.numSessions}
      />
    )
  })
}

export default function SearchPageUsersRow(props) {
  return (
    <Container>
      <AllTheGamers>{map(props.users)}</AllTheGamers>
      {/* <ShowAllContainer>
        {props.users.length > props.first && (
          <ShowAll to={`/search/users`}>
            {`Show All Users`}
            <ShowAllRight />
          </ShowAll>
        )}
      </ShowAllContainer> */}
    </Container>
  )
}
