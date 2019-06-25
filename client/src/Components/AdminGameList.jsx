import React from 'react'

import AdminGame from './AdminGame'

export default function AdminGameList(props) {
  return props.array.map(game => (
    <AdminGame
      picture={game.picture}
      name={game.name}
      tags={game.tags}
      numSessions={game.numSessions}
    />
  ))
}
