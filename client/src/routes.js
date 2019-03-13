import HomePage from './Pages/HomePage'
import GamesPage from './Pages/GamesPage'
import SpecificGamePage from './Pages/SpecificGamePage'
import SpecificSessionPage from './Pages/SpecificSessionPage'
import UserProfile from './Pages/UserProfile'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignupPage'
import GamersPage from './Pages/GamersPage'
import UserSessionsPage from './Pages/UserSessionsPage'
import BecomeAGamerIntroPage from './Pages/BecomeAGamerIntroPage'
import BecomeAGamerBackground from './Pages/BecomeAGamerBackgroundPage'

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/games',
    exact: true,
    component: GamesPage,
  },
  {
    path: '/games/:game',
    component: SpecificGamePage,
  },
  {
    path: '/gamers',
    component: GamersPage,
  },
  {
    path: '/users/:user/:game',
    component: SpecificSessionPage,
  },
  {
    path: '/become-a-gamer',
    exact: true,
    component: BecomeAGamerIntroPage,
  },
  {
    path: '/become-a-gamer/background',
    component: BecomeAGamerBackground,
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
