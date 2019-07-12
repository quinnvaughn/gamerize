import React from 'react'

import GamerRequestRow from './GamerRequestRow'

export default function GamerRequestRowList(props) {
  return props.array.map(gamerRequest => (
    <GamerRequestRow
      refetch={props.refetch}
      id={gamerRequest.id}
      user={gamerRequest.user}
      socialMedia={gamerRequest.socialMedia}
      occupations={gamerRequest.occupations}
      age={gamerRequest.age}
      ownsOwnBankAccount={gamerRequest.ownsOwnBankAccount}
    />
  ))
}
