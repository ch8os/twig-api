const Joi = require('joi');
const Auth = require('./auth');
const Ping = require('./ping');
const Changelog = require('./changelog');
const navSettings = require('./navsettings');
const Node = require('./node');

module.exports = [
  {
    method: ['GET'],
    path: '/ping',
    handler: Ping.ping,
    config: {
      auth: false,
    }
  },
  {
    method: ['GET'],
    path: '/twig/{id}/nodes/rolledup',
    handler: Node.nodeRollupView,
    config: {
      auth: false,
    }
  },
  {
    method: ['POST'],
    path: '/twiglets/{id}/changelog',
    handler: Changelog.add,
    config: {
      validate: {
        payload: {
          commitMessage: Joi.string().required().trim(),
        }
      }
    }
  },
  {
    method: ['GET'],
    path: '/twiglets/{id}/changelog',
    handler: Changelog.get,
  },
  {
    method: ['PUT'],
    path: '/twiglets/{id}/navsettings',
    handler: navSettings.put,
    config: {
      validate: {
        payload: {
          _viewId: Joi.string().required().trim(),
          key: Joi.string().required().trim(),
          value: Joi.any().required(),
        }
      }
    }
  },
  {
    method: ['POST'],
    path: '/login',
    handler: Auth.login,
    config: {
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      validate: {
        payload: {
          email: Joi.string().email().required().trim(),
          password: Joi.string().required().trim()
        }
      },
    }
  },
  {
    method: 'POST',
    path: '/logout',
    handler: Auth.logout,
    config: {
      auth: false,
    }
  }
];
