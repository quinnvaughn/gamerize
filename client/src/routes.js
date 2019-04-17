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
import BecomeAGamerDetails from './Pages/BecomeAGamerDetailsPage'
import BecomeAGamerFinished from './Pages/BecomeAGamerFinishedPage'
import GamerDashboard from './Pages/GamerDashboard'
import NotificationsPage from './Pages/NotificationsPage'
import EditProfileInfoPage from './Pages/EditProfileInfoPage'

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
    path: '/users/:user/:game/:id',
    component: SpecificSessionPage,
  },
  {
    path: '/become-a-gamer',
    exact: true,
    protected: true,
    component: BecomeAGamerIntroPage,
  },
  {
    path: '/become-a-gamer/background',
    protected: true,
    component: BecomeAGamerBackground,
  },
  {
    path: '/become-a-gamer/details',
    protected: true,
    component: BecomeAGamerDetails,
  },
  {
    path: '/become-a-gamer/finished',
    protected: true,
    component: BecomeAGamerFinished,
  },
  {
    path: '/gamer-dashboard',
    component: GamerDashboard,
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
    path: '/sessions',
    protected: true,
    exact: true,
    component: UserSessionsPage,
  },
  {
    path: '/notifications',
    protected: true,
    component: NotificationsPage,
  },
  {
    path: '/profile/edit',
    protected: true,
    component: EditProfileInfoPage,
  },
]

export default routes
