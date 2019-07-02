import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { MdClose } from 'react-icons/md'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

//local imports
import { formatSystem, capitalize } from '../utils/Strings'
import { formatLauncher } from '../utils/System'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'
import SubmitButton from './SubmitButton'

const Card = styled.div`
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    box-shadow: ${props =>
      !props.back &&
      '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08)'};
    cursor: ${props => !props.back && 'pointer'};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const EditSession = styled.button`
  background: ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 1px solid ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 1rem;
  pointer-events: ${props => props.disabled && 'none'};
`

const DeleteSession = styled.button`
  background: ${props => (props.disabled ? '#ebebeb' : '#fff')};
  padding: 1rem 1.4rem;
  color: ${props => (props.disabled ? '#fff' : '#db1422')};
  cursor: pointer;
  outline: 0;
  border: 1px solid ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 1rem;
  pointer-events: ${props => props.disabled && 'none'};
`

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
`

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const Close = styled(MdClose)`
  font-size: 3rem;
  color: black;
  :hover {
    color: #db1422;
    cursor: pointer;
  }
`

const UpdateSessionForm = styled.form``

const UPDATE_SESSION = gql`
  mutation($input: UpdateSessionInput!) {
    updateSession(input: $input) {
      updatedSession {
        id
      }
    }
  }
`

const RETIRE_SESSION = gql`
  mutation($input: RetireSessionInput!) {
    retireSession(input: $input) {
      retired
    }
  }
`

const systems = ['PC', 'XBOX_ONE', 'PS4', 'NINTENDO_SWITCH']

const launchers = [
  'EPIC',
  'STEAM',
  'ORIGIN',
  'BATTLENET',
  'GOG',
  'UPLAY',
  'BETHESDA',
  'ITCH',
  'WINDOWS',
  'RIOT',
]

const types = ['CUSTOM', 'CASUAL', 'COMPETITIVE']

const createdSessionSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('A title is required'),
  price: yup.lazy(value => {
    if (parseFloat(value) === 0) {
      return yup
        .number()
        .max(0, 'Price must be either 0 or at least 1 dollar')
        .required('Price is required')
    }
    return yup
      .number()
      .min(1, 'Price must be either 0 or at least 1 dollar')
      .required('Price is required')
  }),
  game: yup
    .string()
    .nullable()
    .required('You must choose a game'),
  launcher: yup.mixed().when('system', {
    is: val => val === 'PC',
    then: yup
      .string()
      .nullable()
      .required('You must have a launcher for PC games'),
  }),
  length: yup
    .number()
    .min(1, 'Length must be at least a minute')
    .required('Length of game is required'),
  type: yup
    .string()
    .nullable()
    .required('Type of game is required'),
  system: yup
    .string()
    .nullable()
    .required('System is required'),
  slots: yup
    .number()
    .min('1', 'You must have at least one slot in your session')
    .required('Slots are required'),
})

export default function CreatedSessionCardBack({
  session,
  state,
  dispatch,
  refetch,
  games,
}) {
  const [submitAction, setSubmitAction] = useState()
  const updateSession = useMutation(UPDATE_SESSION)
  const retireSession = useMutation(RETIRE_SESSION)
  return (
    <Card back>
      <Formik
        enableReinitialize={true}
        validationSchema={createdSessionSchema}
        initialValues={{
          title: session.title,
          price: parseFloat(session.price).toFixed(2),
          length: session.length,
          game: session.game.name,
          system: session.system,
          launcher: session.launcher,
          slots: session.slots,
          type: session.type,
        }}
        isInitialValid={true}
        onSubmit={async (values, actions) => {
          if (submitAction === 'update') {
            const input = {
              sessionId: session.id,
              title: values.title,
              game: values.game,
              price: parseFloat(values.price),
              length: values.length,
              system: values.system,
              slots: values.slots,
              type: values.type,
            }
            const { data } = await updateSession({ variables: { input } })
            if (data.updateSession.updatedSession.id) {
              actions.setSubmitting(false)
              await refetch()
              dispatch({ type: 'flip', payload: false })
            }
          } else if (submitAction === 'retire') {
            const input = {
              sessionId: session.id,
            }
            const { data } = await retireSession({ variables: { input } })
            if (data.retireSession.retired) {
              actions.setSubmitting(false)
              await refetch()
              dispatch({ type: 'flip', payload: false })
            }
          }
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          resetForm,
          submitForm,
          isSubmitting,
          isValid,
        }) => (
          <UpdateSessionForm method="post" onSubmit={handleSubmit}>
            <TopContainer>
              <Title>Update Session</Title>
              <Close
                onClick={() => {
                  dispatch({ type: 'flip', payload: false })
                  resetForm()
                }}
              />
            </TopContainer>
            <Field
              label="Title"
              name="title"
              placeholder="Edit your title"
              type="text"
              required
              component={CustomInput}
            />
            <Field
              label="Price"
              name="price"
              min="0.01"
              step="0.01"
              type="number"
              placeholder="Set the price"
              required
              component={CustomInput}
            />
            <Field
              label="Game"
              name="game"
              menuPortalTarget
              isClearable={false}
              options={games.allGames.map(game => ({
                value: game.name,
                label: game.name,
              }))}
              placeholder="Select your game"
              component={CustomSelect}
            />
            <Field
              label="Length"
              name="length"
              type="number"
              min="1"
              placeholder="Pick the length of the game in whole minutes"
              required
              component={CustomInput}
            />
            <Field
              label="System"
              name="system"
              isClearable={false}
              menuPortalTarget
              options={systems.map(system => ({
                value: system,
                label: formatSystem(system),
              }))}
              placeholder="Choose your system"
              component={CustomSelect}
            />
            {(values.system === 'PC' || values.system.value === 'PC') && (
              <Field
                label="Launcher"
                name="launcher"
                isClearable={false}
                menuPortalTarget
                placeholder="Please select your launcher"
                options={launchers.map(launcher => ({
                  value: launcher,
                  label: formatLauncher(launcher),
                }))}
                component={CustomSelect}
              />
            )}
            <Field
              label="Slots"
              name="slots"
              min="1"
              type="number"
              placeholder="Specify how you people you can play with"
              required
              component={CustomInput}
            />
            <Field
              label="Type"
              name="type"
              isClearable={false}
              menuPortalTarget
              options={types.map(type => ({
                value: type,
                label: capitalize(type),
              }))}
              placeholder="Choose the type of game"
              component={CustomSelect}
            />
            <ButtonContainer>
              <SubmitButton
                primary
                onClick={async () => {
                  await setSubmitAction('update')
                }}
                isSubmitting={isSubmitting}
                isValid={isValid}
              >
                Update Session
              </SubmitButton>
              <SubmitButton
                onClick={async () => {
                  await setSubmitAction('retire')
                }}
                isSubmitting={isSubmitting}
                isValid={isValid}
              >
                Retire Session
              </SubmitButton>
            </ButtonContainer>
          </UpdateSessionForm>
        )}
      </Formik>
    </Card>
  )
}
