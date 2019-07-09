import React, { useRef } from 'react'
import styled from 'styled-components'
import { Formik, Field } from 'formik'

import { FaSearch } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { useSearch } from '../State/SearchContext'
import SubmitButton from './SubmitButton'

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.8rem;
  font-weight: 800;
  margin-right: 0.4rem;
  :hover {
    cursor: text;
  }
  :focus {
    outline: none;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
  padding: 1rem 0;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid black;
  cursor: text;
  width: 100%;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const SearchForm = styled.form`
  width: 60rem;
  @media (max-width: 640px) {
    width: 90%;
  }
`

const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`

const StyledSearch = styled(FaSearch)`
  height: 1.8rem;
  width: 1.8rem;
  margin-left: 1.2rem;
  margin-right: 2rem;
`

const StyledExit = styled(MdClose)`
  height: 1.8rem;
  width: 1.8rem;
  margin-left: 1.2rem;
  cursor: pointer;
  margin-right: 1.2rem;
`

const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export default function SearchPageSearchBar(props) {
  const [search, dispatch] = useSearch()
  return (
    <Formik
      enableReinitialize
      initialValues={{
        text: search.text,
      }}
      onSubmit={async (values, actions) => {
        dispatch({ type: 'SET_TEXT', payload: values.text })
        actions.setSubmitting(false)
      }}
    >
      {({ handleSubmit, resetForm, isSubmitting, values }) => (
        <SearchBarContainer>
          <SearchForm onSubmit={handleSubmit}>
            <Container>
              <StyledSearch />
              <Field placeholder="Search" name="text" component={SearchInput} />
              {search.text.length > 0 && (
                <StyledExit
                  onClick={() => {
                    dispatch({ type: 'CLEAR_TEXT' })
                    resetForm()
                  }}
                />
              )}
            </Container>
            <SearchButtonContainer>
              <SubmitButton
                primary
                width={85}
                isSubmitting={isSubmitting || props.loading}
                isValid={!(values.text.length === 0)}
                disabled={values.text.length === 0}
              >
                Search
              </SubmitButton>
            </SearchButtonContainer>
          </SearchForm>
        </SearchBarContainer>
      )}
    </Formik>
  )
}

function SearchInput({ field, form: { touched, errors }, label, ...props }) {
  return <Input type={props.type ? props.type : 'text'} {...field} {...props} />
}
