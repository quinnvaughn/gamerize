import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import Media from 'react-media'
import { withRouter } from 'react-router-dom'
import { Image } from 'cloudinary-react'

import IconWithDropdown from './IconWithDropdown'
import SearchBar from './SearchBar'
import SmallSearchBar from './SmallSearchBar'

const Icon = styled(Image)`
  margin-right: 2.4rem;
  cursor: pointer;
  @media (max-width: 1127px) {
    margin-right: 0;
  }
`

function DynamicIconAndSearch(props) {
  const [clicked, setClicked] = useState(false)
  return (
    <Media query={{ maxWidth: 479 }}>
      {matches =>
        matches ? (
          <Fragment>
            {!clicked && (
              <IconWithDropdown
                loggedIn={props.loggedIn}
                gamer={props.gamer}
                admin={props.admin}
              />
            )}
            <SmallSearchBar setClicked={setClicked} clicked={clicked} />
          </Fragment>
        ) : (
          <Media query={{ maxWidth: 1127 }}>
            {matches =>
              matches ? (
                <Fragment>
                  <IconWithDropdown
                    loggedIn={props.loggedIn}
                    gamer={props.gamer}
                    admin={props.admin}
                  />
                  <SearchBar />
                </Fragment>
              ) : (
                <Fragment>
                  <Icon
                    publicId="https://res.cloudinary.com/gamerize/image/upload/gamerize_logo.png"
                    height="80"
                    onClick={async () => {
                      await props.history.push('/')
                    }}
                  />
                  <SearchBar />
                </Fragment>
              )
            }
          </Media>
        )
      }
    </Media>
  )
}

export default withRouter(DynamicIconAndSearch)
