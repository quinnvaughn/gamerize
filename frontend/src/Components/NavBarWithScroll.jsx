import React, { Fragment, useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'

import NavBar from './NavBar'
import SessionLinks from './SessionLinks'

const GlobalStyle = createGlobalStyle`
  .navbar {
    position: relative;
  }
`

export default function NavBarWithScroll(props) {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY)
  const handleScroll = () => {
    setScrollPosition(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollPosition, handleScroll])
  return (
    <Fragment>
      <NavBar />
      <GlobalStyle />
      {scrollPosition >= 340 && (
        <SessionLinks
          visibleSection={props.visibleSection}
          setVisible={props.setVisible}
        />
      )}
    </Fragment>
  )
}
