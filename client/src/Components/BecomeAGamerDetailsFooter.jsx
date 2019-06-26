import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { FaChevronLeft } from 'react-icons/fa'
import { useMutation } from 'react-apollo-hooks'
import { withRouter, Link } from 'react-router-dom'

import { objectIsEmpty } from '../utils/Objects'

const Previous = styled(Link)`
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const PreviousText = styled.span`
  color: #db1422;
  font-size: 1.6rem;
  font-weight: 600;
`

const PreviousArrow = styled(FaChevronLeft)`
  color: #db1422;
  font-size: 1.6rem;
  margin-right: 0.5rem;
`

const Finish = styled.button`
  color: #fff;
  text-decoration: none;
  outline: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  cursor: pointer;
  font-weight: 600;
  padding: 1rem 2.2rem;
  background: ${props => (props.disabled ? '#dddfe2' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
  border: none;
  :focus {
    outline: none;
  }
`

const ButtonsContainer = styled.div`
  position: fixed;
  z-index: 200;
  bottom: 0;
  left: 0;
  width: 100%;
`

const ButtonsInner = styled.div`
  max-width: 91.2rem;
  margin: 0 auto;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
`

const Buttons = styled.div`
  background: #fff;
  border-top: 1px solid #dddfe2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 3rem 1.6rem;
  width: 60%;
`

const CREATE_GAMER_REQUEST = gql`
  mutation($input: CreateGamerRequestInput!) {
    createGamerRequest(input: $input) {
      created
      msg
    }
  }
`

function BecomeAGamerDetailsFooter(props) {
  const createGamerRequest = useMutation(CREATE_GAMER_REQUEST)
  return (
    <ButtonsContainer>
      <ButtonsInner>
        <Buttons>
          <Previous to="/become-a-gamer/background">
            <PreviousArrow />
            <PreviousText>Previous</PreviousText>
          </Previous>
          <Finish
            disabled={objectIsEmpty(props.container.state.socialMedia)}
            onClick={async () => {
              const input = { ...props.container.state }
              await createGamerRequest({
                variables: {
                  input,
                },
              })
              props.history.push('/become-a-gamer/finished')
            }}
          >
            Finish
          </Finish>
        </Buttons>
      </ButtonsInner>
    </ButtonsContainer>
  )
}

export default withRouter(BecomeAGamerDetailsFooter)