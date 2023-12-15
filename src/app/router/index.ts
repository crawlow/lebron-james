import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

import { DefaultLayout, PublicLayout } from '@/widgets';
import {
  Teams,
  TeamDetails,
  Team,
  Players,
  PlayerDetails,
  Player,
  SignInPage,
  SignUp,
  Error,
} from '@/pages';
import { useUserStore } from '@/entities';
import { storeToRefs } from 'pinia';

const DEFAULT = 'default';

const routes: Array<RouteRecordRaw> = [
  {
    name: DEFAULT,
    path: `/`,
    component: DefaultLayout,
    meta: {
      auth: true,
    },
    children: [
      {
        path: 'teams',
        name: 'teams',
        redirect: { name: 'teams-list' },
        children: [
          {
            name: 'teams-list',
            path: 'list',
            component: Teams,
          },
          {
            name: 'team-detail',
            path: 'details/:id',
            component: TeamDetails,
          },
          {
            name: 'team',
            path: 'team/:id?',
            component: Team,
          },
        ],
      },
      {
        name: 'players',
        path: 'players',
        redirect: { name: 'players-list' },
        children: [
          {
            name: 'players-list',
            path: 'list',
            component: Players,
          },
          {
            name: 'player-detail',
            path: 'deatils/:id',
            component: PlayerDetails,
          },
          {
            name: 'player',
            path: 'player/:id?',
            component: Player,
          },
        ],
      },
    ],
  },
  {
    path: '',
    name: 'public',
    component: PublicLayout,
    redirect: { name: 'signIn' },
    children: [
      {
        path: '/signIn',
        name: 'signIn',
        component: SignInPage,
        meta: {
          title: 'Sign In',
        },
      },
      {
        path: '/signUp',
        name: 'signUp',
        component: SignUp,
        meta: {
          title: 'Sign Up',
        },
      },
    ],
  },
  { path: '/:pathMatch(.*)', component: Error },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

let isGottenUser = false;

router.beforeEach(async (to, from, next) => {
  document.title = `Lebron James - ${to.meta.title || 'dex'}`;
  const { getCurrentUser } = useUserStore();
  const { currentUser } = storeToRefs(useUserStore());
  if (!isGottenUser) {
    isGottenUser = true;
    getCurrentUser();
  }
  if (currentUser.value) {
    if (to.meta.auth) {
      next();
    } else {
      next({ name: 'teams' });
    }
  } else {
    if (to.meta.auth) {
      next('/');
    } else {
      next();
    }
  }
});

export { routes };
export default router;
