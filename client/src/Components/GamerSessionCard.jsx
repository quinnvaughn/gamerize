import React, { useState, useRef, Fragment } from 'react'
import styled from 'styled-components'

//local imports
import GamerSessionCardFront from './GamerSessionCardFront'
import GamerSessionCardBack from './GamerSessionCardBack'

const Container = styled.div`
  position: relative;
`

export default function GamerSessionCard({ session, setup, refetch, last }) {
  const node = useRef()
  const [state, setState] = useState('FRONT')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  return (
    <Container ref={node}>
      <Fragment>
        {state === 'FRONT' && (
          <GamerSessionCardFront
            session={session}
            setState={setState}
            setup={setup}
            last={last}
            key="front"
          />
        )}
        {state === 'BACK' && (
          <GamerSessionCardBack
            error={error}
            setError={setError}
            success={success}
            setSuccess={setSuccess}
            session={session}
            setState={setState}
            refetch={refetch}
            last={last}
            key="back"
          />
        )}
      </Fragment>
    </Container>
  )
}
