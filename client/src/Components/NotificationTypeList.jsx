import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Section = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`

const SectionTitle = styled.div`
  font-size: 2rem;
  font-weight: 400;
  padding-bottom: 1rem;
  width: 100%;
  border-bottom: 1px solid black;
`

export default function NotificationTypeList(props) {
  return (
    <Fragment>
      <Section>
        <SectionTitle>{props.sectionTitle}</SectionTitle>
        {props.array &&
          props.array.map((notification, index) => (
            <props.component
              refetch={props.refetch}
              notification={notification}
              key={notification.id}
              last={index === props.array.length - 1}
            />
          ))}
      </Section>
    </Fragment>
  )
}

NotificationTypeList.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  array: PropTypes.array.isRequired,
  component: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
}
