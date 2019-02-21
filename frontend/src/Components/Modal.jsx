import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const show = keyframes`
    0%: {
        display: none;
        opacity: 0;
    },
    1%: {
        display: flex;
        opacity: 0;
    },
    100%: {
        opacity: 1
    }
`

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999 !important;
  opacity: 1;
  overflow-x: hidden;
  overflow-y: auto;
  animation: ${show} 0.5s ease;
`

const Modal = styled.div`
  position: relative;
  z-index: 9999 !important;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0, 0, 1rem, rgba(0, 0, 0, 0.2);
  max-width: 108rem;
  max-height: 100%;
`

const ModalContent = styled.div``

export default class SimpleModal extends Component {
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return
    }
    this.handleClickOutside()
  }

  handleClickOutside = () => {
    this.props.onRequestClose()
  }
  render() {
    const { children } = this.props
    return (
      <Overlay>
        <Modal ref={node => (this.node = node)}>
          <ModalContent>{children}</ModalContent>
        </Modal>
      </Overlay>
    )
  }
}
