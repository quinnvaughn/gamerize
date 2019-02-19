import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import _ from 'underscore'

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
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  opacity: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  animation: ${show} 0.5s ease;
`

const Modal = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0, 0, 0.625rem, rgba(0, 0, 0, 0.2);
  max-width: 1080px;
  max-height: 100%;
`

const ModalContent = styled.div``

const Apply = styled.button`
  outline: 0;
  border: 0;
  padding: 6px 8px;
  border-radius: 4px;
  color: #fff;
  background: red;
`

export default class SimpleModal extends Component {
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false)
    document.addEventListener('click', this.handleOutsideClick, false)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false)
    document.removeEventListener('click', this.handleOutsideClick, false)
  }

  handleKeyUp = e => {
    const { onRequestClose } = this.props
    const keys = {
      27: () => {
        e.preventDefault()
        onRequestClose()
        window.removeEventListener('keyup', this.handleKeyUp, false)
      },
    }
    if (keys[e.keyCode]) {
      keys[e.keyCode]()
    }
  }

  handleOutsideClick = e => {
    const { onRequestClose } = this.props

    if (!_.isNull(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onRequestClose()
        document.removeEventListener('click', this.handleOutsideClick, false)
      }
    }
  }
  render() {
    const { onRequestClose, children, apply } = this.props
    return (
      <Overlay>
        <Modal ref={node => (this.modal = node)}>
          <ModalContent>
            {children}
            {/* <Apply
              type="button"
              onClick={() => {
                apply()
                onRequestClose()
              }}
            >
              Apply
            </Apply> */}
          </ModalContent>
        </Modal>
      </Overlay>
    )
  }
}
