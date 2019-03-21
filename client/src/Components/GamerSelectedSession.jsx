import React from 'react'
import styled from 'styled-components'
import { useStore } from 'react-hookstore'

//local imports
import Modal from './Modal'
import gamerSessionSelection from '../Stores/GamerSessionSelectionStore'

export default function GamerSelectedSession(props) {
  const [_, dispatch] = useStore(gamerSessionSelection)
  return (
    <Modal
      onRequestClose={() =>
        dispatch({ type: 'setSelectedSession', payload: null })
      }
    >
      <div>This is a modal</div>
    </Modal>
  )
}
