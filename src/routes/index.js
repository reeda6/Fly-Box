
import Amplify from 'aws-amplify';
import { auth } from '../config.js';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: auth.amplify.region,
    userPoolId: auth.amplify.userPoolId,
    identityPoolId: auth.amplify.identityPoolId,
    userPoolWebClientId: auth.amplify.userPoolWebClientId,
  },
  Storage: {
    region: auth.amplify.region,
    bucket: auth.s3.bucket,
    identityPoolId: auth.s3.userPoolId,
  },
  API: {
    endpoints: [
      {
        name: 'fb-dev-api-2',
        endpoint: auth.apigateway.URL,
        region: auth.amplify.region,
      },
    ],
  },
});

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/contact',
      load: () => import(/* webpackChunkName: 'contact' */ './contact'),
    },
    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/register',
      load: () => import(/* webpackChunkName: 'register' */ './register'),
    },
    {
      path: '/about',
      load: () => import(/* webpackChunkName: 'about' */ './about'),
    },
    {
      path: '/privacy',
      load: () => import(/* webpackChunkName: 'privacy' */ './privacy'),
    },
    {
      path: '/admin',
      load: () => import(/* webpackChunkName: 'admin' */ './admin'),
    },
    {
      path: '/trips',
      load: () => import(/* webpackChunkName: 'trips' */ './trips'),
    },

    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
