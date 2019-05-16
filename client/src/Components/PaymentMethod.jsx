import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  :last-of-type {
    margin-bottom: 0;
  }
  border-bottom: 1px solid #d3d3d3;
`

const Brand = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
`

const LastFour = styled.div`
  background: #d3d3d3;
  border-radius: 4px;
  padding: 0.5rem;
  margin-left: 1rem;
  font-size: 1.8rem;
  text-align: center;
`

const Remove = styled.button`
  border: 1px solid #db1422;
  cursor: pointer;
  outline: 0;
  background: ${props => (props.disabled ? '#ebebeb' : '#fff')};
  pointer-events: ${props => props.disabled && 'none'};
  color: #db1422;
  border-radius: 4px;
  margin-left: ${props => (props.noMargin ? '1rem' : 'auto')};
  padding: 1rem 1.5rem;
  font-size: 1.6rem;
  font-weight: 600;
`

const SetDefault = styled.button`
  border: 1px solid #db1422;
  cursor: pointer;
  outline: 0;
  background: ${props => (props.disabled ? '#ebebeb' : '#fff')};
  pointer-events: ${props => props.disabled && 'none'};
  color: #db1422;
  border-radius: 4px;
  margin-left: auto;
  padding: 1rem 1.5rem;
  font-size: 1.6rem;
  font-weight: 600;
`

const Default = styled.div`
  font-size: 1.6rem;
  margin-left: 0.5rem;
  font-weight: 600;
`

const DELETE_CARD = gql`
  mutation($input: DeleteCardInput!) {
    deleteCard(input: $input) {
      deleted
    }
  }
`

const CHANGE_DEFAULT_CARD = gql`
  mutation($input: ChangeDefaultCardInput!) {
    changeDefaultCard(input: $input) {
      updated
    }
  }
`

export default function PaymentMethod(props) {
  const deleteCard = useMutation(DELETE_CARD)
  const changeDefaultCard = useMutation(CHANGE_DEFAULT_CARD)
  return (
    <Container>
      <Brand>{props.savedCard.brand.toUpperCase()}</Brand>
      <LastFour>****{props.savedCard.lastFour}</LastFour>
      {props.savedCard.default && <Default>Default Card</Default>}
      {!props.savedCard.default && (
        <SetDefault
          onClick={async () => {
            const input = {
              cardId: props.savedCard.cardId,
              id: props.savedCard.id,
            }
            const { data } = await changeDefaultCard({ variables: { input } })
            if (data.changeDefaultCard.updated) {
              props.refetch()
            }
          }}
        >
          Set as Default
        </SetDefault>
      )}
      <Remove
        noMargin={!props.savedCard.default}
        onClick={async () => {
          const input = { cardId: props.savedCard.cardId }
          const { data } = await deleteCard({ variables: { input } })
          if (data.deleteCard.deleted) {
            props.refetch()
          }
        }}
      >
        Remove
      </Remove>
    </Container>
  )
}
