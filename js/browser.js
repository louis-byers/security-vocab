'use strict';

const contexts = exports.contexts = new Map();
const constants = exports.constants = require('./constants.js');
const context_v1 = require('./contexts/security-v1.js');
const context_v2 = require('./contexts/security-v2.js');

contexts.set(
  constants.SECURITY_CONTEXT_V1_URL,
  context_v1.SECURITY_CONTEXT_V1);
contexts.set(
  constants.SECURITY_CONTEXT_V2_URL,
  context_v2.SECURITY_CONTEXT_V2);
