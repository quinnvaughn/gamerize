import React, { useState } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Image } from 'cloudinary-react'

//local imports
import AdminDashboardNav from '../Components/AdminDashboardNav'
import Modal from '../Components/Modal'
import CreateGame from '../Components/CreateGame'
import Loading from '../Components/Loading'
import AdminGame from '../Components/AdminGame'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 1rem;
  margin-bottom: 9rem;
`

const YourSessions = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-right: 1rem;
`

const NewSession = styled.button`
  background: #db1422;
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 1px solid #db1422;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
`

const Games = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const GET_GAMES = gql`
  {
    allGames {
      id
      name
      picture
      banner
      tags
      numSessions
      launcher
    }
  }
`

export default function AdminDashboardGamesPage(props) {
  const [openNew, setOpenNew] = useState(false)
  const { data, loading, refetch } = useQuery(GET_GAMES)
  return loading ? (
    <Loading admin />
  ) : (
    <PageContainer>
      <AdminDashboardNav />
      <Content>
        <Top>
          <YourSessions>Games</YourSessions>
          <NewSession onClick={() => setOpenNew(true)}>
            Create new game
          </NewSession>
        </Top>
        <Games>
          {data.allGames.map(game => (
            <AdminGame
              picture={game.picture}
              name={game.name}
              launcher={game.launcher}
              tags={game.tags}
              numSessions={game.numSessions}
            />
          ))}
        </Games>
        {/* <Sessions>
          {sessions.myGamingSessions.map(session => (
            <CreatedSessionCard
              session={session}
              refetch={refetch}
              setup={data.me.setup}
              setOpen={setEdit}
              key={session.title + session.game}
            />
          ))}
        </Sessions>
      </Content> */}
        {openNew && (
          <Modal onRequestClose={() => setOpenNew(false)} width={600}>
            <CreateGame setOpen={setOpenNew} refetch={refetch} />
          </Modal>
        )}
      </Content>
    </PageContainer>
  )
}
