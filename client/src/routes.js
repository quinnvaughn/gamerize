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
import EditProfilePhotosPage from './Pages/EditProfilePhotosPage'
import UserOnboardingInfoPage from './Pages/UserOnboardingInfoPage'
import UserOnboardingNeedToKnowPage from './Pages/UserOnboardingNeedToKnowPage'
import AdminDashboard from './Pages/AdminDashboard'
import GamerOnboarding from './Pages/GamerOnboarding'
import SessionsPage from './Pages/SessionsPage'
import NotThere from './Pages/404Page'

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
    path: '/gamer-onboarding',
    component: GamerOnboarding,
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
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
    path: '/user-onboarding/info',
    component: UserOnboardingInfoPage,
    protected: true,
  },
  {
    path: '/user-onboarding/need-to-know',
    component: UserOnboardingNeedToKnowPage,
    protected: true,
  },
  {
    path: '/my-sessions',
    protected: true,
    exact: true,
    component: UserSessionsPage,
  },
  {
    path: '/sessions',
    component: SessionsPage,
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
  {
    path: '/profile/photos',
    protected: true,
    component: EditProfilePhotosPage,
  },
  {
    component: NotThere,
  },
]

export default routes
