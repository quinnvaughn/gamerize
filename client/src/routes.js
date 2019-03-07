import HomePage from './Pages/HomePage'
import GamesPage from './Pages/GamesPage'
import SpecificGamePage from './Pages/SpecificGamePage'
import SpecificSessionPage from './Pages/SpecificSessionPage'
import UserProfile from './Pages/UserProfile'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignupPage'
import UserSessionsPage from './Pages/UserSessionsPage'

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/games',
    component: GamesPage,
  },
  {
    path: '/games/:game',
    component: SpecificGamePage,
  },
  {
    path: '/users/:user/:game',
    component: SpecificSessionPage,
  },
  {
    path: '/users/:user',
    component: UserProfile,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/sign-up',
    component: SignUpPage,
  },
  {
    path: '/sessions/',
    component: UserSessionsPage,
  },
]

export default routes