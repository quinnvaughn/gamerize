import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'

const Container = styled.div`
  margin-bottom: 0.5rem;
`

const SmallErrorMessage = styled.div`
  margin-bottom: 0.2rem;
  color: #db1422;
  font-size: 1.2rem;
`

export default function CustomSelect({
  placeholder,
  field,
  form: { touched, errors, setFieldValue, setFieldTouched },
  options,
  isClearable,
  menuPortalTarget,
}) {
  const onChange = option => {
    setFieldValue(field.name, option.value)
  }
  const getValue = () => {
    if (options) {
      return options.find(option => option.value === field.value)
    } else {
      return ''
    }
  }
  return (
    <Container>
      <Select
        name={field.name}
        value={getValue()}
        onChange={onChange}
        onBlur={() => setFieldTouched(field.name)}
        placeholder={placeholder}
        isSearchable
        isClearable={isClearable === null ? true : isClearable}
        options={options}
        menuPortalTarget={menuPortalTarget ? document.body : null}
        styles={{
          container: base => ({
            ...base,
            marginBottom: '0.5rem',
            fontSize: '1.6rem',
            fontWeight: 600,
          }),
          control: base => ({
            ...base,
            border: '1px solid #ebebeb',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            ':hover': {
              border: '1px solid #ebebeb',
              boxShadow:
                '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08)',
            },
          }),
          option: base => ({
            ...base,
            position: 'relative',
            zIndex: 9000,
          }),
          singleValue: base => ({
            ...base,
            color: 'black',
          }),
          menuPortal: base => ({
            ...base,
            fontSize: '1.6rem',
            fontWeight: 600,
            zIndex: 999,
          }),
        }}
      />
      {touched[field.name] && errors[field.name] && (
        <SmallErrorMessage>{errors[field.name]}</SmallErrorMessage>
      )}
    </Container>
  )
}
