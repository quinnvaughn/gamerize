import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'
import * as yup from 'yup'
import { Formik, Field } from 'formik'

//local imports
import { formatSystem, capitalize } from '../utils/Strings'
import { formatLauncher } from '../utils/System'
import { Mixpanel } from './Mixpanel'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`

const CreateSessionButton = styled.button`
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

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const CreateSessionForm = styled.form``

const CREATE_SESSION = gql`
  mutation($input: CreateGamingSessionInput!) {
    createGamingSession(input: $input) {
      gamingSession {
        id
      }
      created
    }
  }
`

const createSessionSchema = yup.object().shape({
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

const SEARCH_GAMES = gql`
  {
    allGames {
      name
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

// make sure to parseInt for Length on submit

export default function CreateSession(props) {
  const { data, loading } = useQuery(SEARCH_GAMES)
  const createSession = useMutation(CREATE_SESSION)
  return loading ? null : (
    <Container>
      <Formik
        validationSchema={createSessionSchema}
        initialValues={{
          title: '',
          game: '',
          price: '',
          launcher: '',
          length: '',
          system: '',
          slots: '',
          type: '',
        }}
        onSubmit={async (values, actions) => {
          const input = {
            title: values.title,
            game: values.game,
            price: parseFloat(values.price),
            launcher: values.launcher.length === 0 ? null : values.launcher,
            length: values.length,
            system: values.system,
            slots: values.slots,
            type: values.type,
          }
          const data = await createSession({ variables: { input } })
          actions.setSubmitting(false)
          Mixpanel.track('Session created')
          await props.refetch()
          props.setOpen(false)
        }}
      >
        {({ values, handleSubmit, isValid, isSubmitting }) => (
          <CreateSessionForm onSubmit={handleSubmit} method="post">
            <Title>Create Session</Title>
            <Field
              name="title"
              placeholder="Add a title"
              type="text"
              required
              component={CustomInput}
            />
            <Field
              name="price"
              min="0.01"
              step="0.01"
              type="number"
              placeholder="Set the price"
              required
              component={CustomInput}
            />
            <Field
              name="game"
              options={data.allGames.map(game => ({
                value: game.name,
                label: game.name,
              }))}
              placeholder="Select your game"
              component={CustomSelect}
            />

            <Field
              name="length"
              type="number"
              min="1"
              placeholder="Pick the length of the game in whole minutes"
              required
              component={CustomInput}
            />
            <Field
              name="system"
              options={systems.map(system => ({
                value: system,
                label: formatSystem(system),
              }))}
              placeholder="Choose your system"
              component={CustomSelect}
            />
            {values.system === 'PC' && (
              <Field
                name="launcher"
                placeholder="Please select your launcher"
                options={launchers.map(launcher => ({
                  value: launcher,
                  label: formatLauncher(launcher),
                }))}
                component={CustomSelect}
              />
            )}
            <Field
              name="slots"
              min="1"
              type="number"
              placeholder="# Slots - Not Including Yourself"
              required
              component={CustomInput}
            />
            <Field
              name="type"
              options={types.map(type => ({
                value: type,
                label: capitalize(type),
              }))}
              placeholder="Choose the type of game"
              component={CustomSelect}
            />
            <CreateSessionButton
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Create Session
            </CreateSessionButton>
          </CreateSessionForm>
        )}
      </Formik>
    </Container>
  )
}
