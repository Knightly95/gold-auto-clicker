import { Router } from '@vaadin/router';
import '../views/index.js';

export const router = new Router();

export const attachRouterOutlet = outlet => {
  router.setOutlet(outlet);
};

router.setRoutes([
  {
    path: '/',
    component: 'home-view',
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/game',
    component: 'game-view',
  },
  {
    path: '/ranking',
    component: 'ranking-view',
  },
]);
