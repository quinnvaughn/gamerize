import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

//local imports

import Dropdown from './Dropdown'

const SEARCH_GAMES = gql`
  {
    allGames {
      name
    }
  }
`

export default function GameSessionDropdown(props) {
  const { data, loading } = useQuery(SEARCH_GAMES)
  return (
    <Dropdown
      placeholder="Add a game"
      value={props.value}
      name="game"
      onBlur={() => props.setFieldTouched('game')}
      isSearchable
      onChange={selected => props.setFieldValue('game', selected.value)}
      options={
        loading
          ? []
          : data.allGames.map(game => ({ value: game.name, label: game.name }))
      }
    />
  )
}
