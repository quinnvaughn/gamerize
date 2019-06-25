import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'

import GamesRow from '../Components/TopGamesRow'
import TopSessionsRow from './TopSessionsRow'
import GamerRow from '../Components/TopGamersRow'

export default function HomePageDynamicRender(props) {
  return (
    <Media
      query={{
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
      }}
    >
      {matches => {
        matches && props.setFirst(props.setAt)
        return matches ? (
          <Fragment>
            <TopSessionsRow
              title="Sessions"
              data={props.thirdData}
              first={props.first}
            />
            <GamerRow
              title="Gamers"
              data={props.secondData}
              first={props.first}
            />
            <GamesRow title="Games" data={props.data} first={props.first} />
          </Fragment>
        ) : null
      }}
    </Media>
  )
}

HomePageDynamicRender.propTypes = {
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  setFirst: PropTypes.func.isRequired,
  setAt: PropTypes.number.isRequired,
  first: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  secondData: PropTypes.object.isRequired,
  thirdData: PropTypes.object.isRequired,
}

HomePageDynamicRender.defaultProps = {
  minWidth: 0,
  maxWidth: 10000,
}
