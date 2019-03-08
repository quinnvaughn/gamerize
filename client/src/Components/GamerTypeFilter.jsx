import React, { useState } from 'react'
import styled from 'styled-components'
import { Formik, Field } from 'formik'

import CheckboxGroup from './CheckboxGroup'
import Checkbox from './Checkbox'

const Modal = styled.div`
  position: absolute;
  top: 4rem;
  left: 0px;
  width: 30rem;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 2.4rem;
  background: white;
`

const Container = styled.div`
  position: relative;
`

const ModalButton = styled.button`
  outline: none;
  border: 1px solid rgb(220, 224, 224);
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
    background: ${props => (props.show ? '#f10e0e' : 'rgb(244, 244, 244)')};
    border: ${props =>
      props.show ? '1px solid #f10e0e' : '1px solid rgb(244, 244, 244)'};
  }
  background: ${props => (props.show ? '#f10e0e' : 'white')};
  color: ${props => (props.show ? 'white' : 'rgb(72,72,72)')};
`

const typings = [
  {
    id: 'celebrities',
    label: 'Celebrity',
  },
  {
    id: 'streamers',
    label: 'Streamer',
  },
  {
    id: 'youtubers',
    label: 'Youtuber',
  },
  {
    id: 'influencers',
    label: 'Influencer',
  },
]

// export default function GamerTypeFilter(props) {
//   const [show, setShow] = useState(false)
//   return (
//     <Container>
//       <ModalButton show={show} onClick={() => setShow(!show)}>
//         Gamer Type
//       </ModalButton>
//       {show && (
//         <Modal>
//           <Formik
//             initialValues={{ checkboxGroup: [] }}
//             onSubmit={(values, actions) => {
//               setTimeout(() => {
//                 console.log(JSON.stringify(values, null, 2))
//                 actions.setSubmitting(false)
//               })
//             }}
//           >
//             {({
//               handleSubmit,
//               setFieldValue,
//               setFieldTouched,
//               values,
//               errors,
//               touched,
//               isSubmitting,
//             }) => (
//               <form onSubmit={handleSubmit}>
//                 <CheckboxGroup
//                   id="checkboxGroup"
//                   value={values.checkboxGroup}
//                   onChange={setFieldValue}
//                   onBlur={setFieldTouched}
//                 >
//                   {typings.map(type => (
//                     <Field
//                       component={Checkbox}
//                       name="checkboxGroup"
//                       id={type.id}
//                       label={type.label}
//                     />
//                   ))}
//                 </CheckboxGroup>
//               </form>
//             )}
//           </Formik>
//           <button type="submit" onClick={() => setShow(false)}>
//             Apply
//           </button>
//         </Modal>
//       )}
//     </Container>
//   )
// }
