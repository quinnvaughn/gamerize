import React, { useReducer, useEffect } from 'react'
import styled from 'styled-components'

//local imports
import GamerDashboardAccountNav from '../Components/GamerDashboardAccountNav'
import GamerDashboardAccountEdit from './GamerDashboardAccountEdit'
import GamerRoute from '../Components/GamerRoute'

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

const initialState = {
  setup: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loadFavoriteGames':
      return { ...state, favoriteGames: action.payload }
    case 'loadSetup':
      return { ...state, setup: action.payload }
    case 'addFavoriteGame':
      return {
        ...state,
        favoriteGames: [...state.favoriteGames, action.payload],
      }
    case 'editSetupLength':
      return { ...state, setup: action.payload }
    default:
      return state
  }
}

const routes = [
  {
    path: '/gamer-dashboard/account/edit',
    component: GamerDashboardAccountEdit,
  },
]

export default function GamerDashboardAccount(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    props.history.push('/gamer-dashboard/account/edit')
  }, {})
  return (
    <PageContainer>
      <Content>
        <GamerDashboardAccountNav />
        {routes.map(route => (
          <GamerRoute
            to={route.path}
            component={route.component}
            exact={route.exact}
            key={route.path}
          />
        ))}
      </Content>
    </PageContainer>
  )
}
