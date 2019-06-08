import React from 'react'
import styled from 'styled-components'

import ScrollIntoView from 'react-scroll-into-view'

const Container = styled.nav`
  height: 6rem;
  border-bottom: 1px solid #dddfe2;
  width: 100vw;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 2rem 4rem 2rem 8rem;
`

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 108rem;
  display: flex;
  align-items: center;
`

const StyledLink = styled.a`
  color: ${props => (props.active ? 'black' : '#db1422')};
  font-size: 1.6rem;
  text-decoration: none;
  cursor: pointer;
  margin-right: 0.5rem;
  :hover {
    text-decoration: underline;
  }
`

const CustomizedSquare = styled.span`
  margin-right: 0.7rem;
`

const links = [
  {
    text: 'Gamer',
    hash: '#gamer',
  },
  {
    text: 'Availability',
    hash: '#availability',
  },
  {
    text: 'Reviews',
    hash: '#reviews',
  },
]

const renderSquaresAndLinks = (
  setVisible,
  visibleSection,
  links,
  link,
  index
) => {
  if (index < links.length - 1) {
    return (
      <ScrollIntoView selector={link.hash} key={link.hash} alignToTop>
        <StyledLink
          active={visibleSection === link.hash}
          onClick={() => setVisible(link.hash)}
        >
          {link.text}
        </StyledLink>
        <CustomizedSquare>&#9642;</CustomizedSquare>
      </ScrollIntoView>
    )
  } else {
    return (
      <ScrollIntoView selector={link.hash} key={link.hash} alignToTop>
        <StyledLink
          active={visibleSection === link.hash}
          onClick={() => setVisible(link.hash)}
        >
          {link.text}
        </StyledLink>
      </ScrollIntoView>
    )
  }
}

export default function SessionLinks(props) {
  return (
    <Container>
      <Content>
        {links.map((link, index) =>
          renderSquaresAndLinks(
            props.setVisible,
            props.visibleSection,
            links,
            link,
            index
          )
        )}
      </Content>
    </Container>
  )
}
