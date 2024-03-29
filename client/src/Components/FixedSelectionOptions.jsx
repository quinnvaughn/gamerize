import React, { useState } from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'

//local imports
import Modal from './Modal'
import SmallSelectionOptions from './SmallSelectionOptions'

const Container = styled.div`
  z-index: 4;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  border-top: 1px solid #dddfe2;
`

const Content = styled.div`
  max-width: 696px;
  margin: 0 auto;
  padding-left: 2.4rem;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Book = styled.button`
  width: 18rem;
  font-weight: 800;
  cursor: pointer;
  color: white;
  background: #db1422;
  border-radius: 4px;
  padding: 1rem 2.2rem;
  height: 4.6rem;
  outline: 0;
  border: 0;
  font-size: 1.6rem;
  line-height: 2.4rem;
`

const Price = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`

const Per = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`

const LeftSide = styled.div``

const BookContainer = styled.div``

export default function FixedSelectionOptions(props) {
  const [open, setModal] = useState(false)
  return (
    <Container>
      <Content>
        <LeftSide>
          <Price>
            {`$${parseFloat(props.session.price).toFixed(2)}`}{' '}
            <Per>per slot</Per>
          </Price>
        </LeftSide>
        <BookContainer>
          <Book onClick={() => setModal(true)}>Book</Book>
        </BookContainer>
        {open && (
          <Modal onRequestClose={() => setModal(false)} width={376}>
            <SmallSelectionOptions {...props} close={() => setModal(false)} />
          </Modal>
        )}
      </Content>
    </Container>
  )
}
