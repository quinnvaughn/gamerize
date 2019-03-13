import React, { Component } from 'react'
import styled, { keyframes, createGlobalStyle } from 'styled-components'

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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999 !important;
  opacity: 1;
  overflow-x: hidden;
  overflow-y: auto;
  animation: ${show} 0.5s ease;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const Modal = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0, 0, 1rem, rgba(0, 0, 0, 0.2);
  max-width: ${props => (props.width ? `${props.width}px` : '108rem')};
  max-height: 100%;
  overflow-y: initial !important;
`

const ModalContent = styled.div`
  position: relative;
`

// So navbar isn't over modal overlay.
const GlobalStyle = createGlobalStyle`
  .navbar {
    z-index: 0;
  }
  body {
    overflow: hidden;
  }
`

export default class SimpleModal extends Component {
  componentDidMount() {
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
      <Overlay id="modal">
        <GlobalStyle />
        <Modal ref={node => (this.node = node)} width={this.props.width}>
          <ModalContent>{children}</ModalContent>
        </Modal>
      </Overlay>
    )
  }
}
