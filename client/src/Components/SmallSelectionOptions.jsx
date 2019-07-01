import React, { Fragment } from 'react'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'

import TimeSlots from './TimeSlots'
import Totals from './Totals'
import { formatGamers } from '../utils/Strings'

const Container = styled.div`
  width: 100%;
  padding: 2.4rem;
`

const Price = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`

const Per = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`

const Top = styled.div`
  padding-bottom: 1.6rem;
  margin-bottom: 2rem;
  border-bottom: 0.1rem solid #dddfe2;
`

const HowManySlots = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
`

const Exit = styled(MdClose)`
  font-size: 3rem;
  cursor: pointer;
  z-index: 1000;
  color: black;
  :hover {
    color: #db1422;
  }
`

const ExitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 1rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #fff;
  height: 3rem;
`

const SignInToBook = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
`

export default function SmallSelectionOptions({
  refetch,
  meRefetch,
  close,
  me,
  notEnoughSpots,
  session,
}) {
  return (
    <Container>
      <ExitContainer>
        <Exit onClick={close} />
      </ExitContainer>
      <Top>
        <Price>
          {`$${parseFloat(session.price).toFixed(2)}`} <Per>per slot</Per>
        </Price>
      </Top>
      {me === null ? (
        <SignInToBook>Please sign in to book</SignInToBook>
      ) : (
        <Fragment>
          {/* <HowManySlots>{`${
            session.slotsLeftToday
          } slots left today`}</HowManySlots> */}
          <TimeSlots
            gamer={formatGamers(session.gamers)}
            game={session.game.name}
          />
          <Totals
            notEnoughSpots={notEnoughSpots}
            refetch={refetch}
            meRefetch={meRefetch}
            me={me}
            session={session}
          />
        </Fragment>
      )}
    </Container>
  )
}
