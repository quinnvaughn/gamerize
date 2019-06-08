import React, { Fragment } from 'react'

//local imports
import GamerOnboardingPhotoPage from './GamerOnboardingPhotoPage'
import GamerOnboardingInfoPage from './GamerOnboardingInfoPage'
import GamerOnboardingRoute from '../Components/GamerOnboardingRoute'

const routes = [
  {
    path: '/gamer-onboarding/photos',
    component: GamerOnboardingPhotoPage,
  },
  {
    path: '/gamer-onboarding/info',
    component: GamerOnboardingInfoPage,
  },
]

export default function GamerOnboarding(props) {
  return (
    <Fragment>
      {routes.map(route => (
        <GamerOnboardingRoute
          path={route.path}
          key={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Fragment>
  )
}
