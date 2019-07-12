import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { FaChevronLeft } from 'react-icons/fa'
import { useMutation } from 'react-apollo-hooks'
import { withRouter, Link } from 'react-router-dom'
import { Formik } from 'formik'

import { emptyStrings } from '../utils/Objects'
import SubmitButton from './SubmitButton'
import { useBecomeAGamer } from '../State/BecomeAGamerContext'

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
  const [becomeAGamer] = useBecomeAGamer()
  return (
    <ButtonsContainer>
      <ButtonsInner>
        <Buttons>
          <Previous to="/become-a-gamer/background">
            <PreviousArrow />
            <PreviousText>Previous</PreviousText>
          </Previous>
          <Formik
            enableReinitialize
            initialValues={{
              occupations: becomeAGamer.occupations,
              addToOccupations: becomeAGamer.addToOccupations,
              socialMedia: becomeAGamer.socialMedia,
              age: becomeAGamer.age,
              ownsOwnBankAccount: becomeAGamer.ownsOwnBankAccount,
            }}
            onSubmit={async (values, actions) => {
              const input = {
                occupations: values.occupations,
                addToOccupations: values.addToOccupations,
                socialMedia: values.socialMedia,
                age: values.age,
                ownsOwnBankAccount:
                  values.ownsOwnBankAccount === 'YES' ? true : false,
              }
              const { data } = await createGamerRequest({
                variables: { input },
              })
              if (data.createGamerRequest.created) {
                actions.setSubmitting(false)
                props.history.push('/become-a-gamer/finished')
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <SubmitButton
                  primary
                  width={85}
                  isSubmitting={isSubmitting}
                  isValid={
                    !emptyStrings(becomeAGamer.socialMedia) &&
                    becomeAGamer.age != null &&
                    becomeAGamer.ownsOwnBankAccount != null
                  }
                  disabled={
                    emptyStrings(becomeAGamer.socialMedia) ||
                    becomeAGamer.age == null ||
                    becomeAGamer.ownsOwnBankAccount == null
                  }
                >
                  Finish
                </SubmitButton>
              </form>
            )}
          </Formik>
        </Buttons>
      </ButtonsInner>
    </ButtonsContainer>
  )
}

export default withRouter(BecomeAGamerDetailsFooter)
