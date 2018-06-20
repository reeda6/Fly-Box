/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
import Amplify from 'aws-amplify';
// import config from '../config';

// apiGateway: {
//   REGION: 'us-east-1',
//   URL: 'https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev'
// },
// cognito: {
//   REGION: 'us-east-1',
//   USER_POOL_ID: 'us-east-1_IYlPcsKwL',
//   APP_CLIENT_ID: '1a3r7tee8896qb3kiuvkagn1kk',
//   IDENTITY_POOL_ID: 'us-east-1:ee7ea795-c051-4046-a393-0703ccbed52f'
// }

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: 'us-east-1',
		userPoolId: 'us-east-1_kyuGMSqi1',
		identityPoolId: 'us-east-1:ee7ea795-c051-4046-a393-0703ccbed52f',
		userPoolWebClientId: '2c2960skbgm3du9f7kh1j8mosn'
	},
	API: {
		endpoints: [
			{
				name: 'testApiCall',
				endpoint: 'https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev',
				region: 'us-east-1'
			}
		]
	}
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
