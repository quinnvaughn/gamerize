import React from 'react'

export const formatCommas = ({ component: Component, array, item, index }) => {
  if (index < array.length - 1) {
    return <Component key={item}>{`${item}, `}</Component>
  } else {
    return <Component key={item}>{`${item}`}</Component>
  }
}
