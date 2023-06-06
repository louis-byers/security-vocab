'use strict';

const constants = require('./constants');

exports.constants = constants;
const contexts = exports.contexts = new Map();
const context_v1 = require('./contexts/security-v1');
const context_v2 = require('./contexts/security-v2');

contexts.set(
  constants.SECURITY_CONTEXT_V1_URL,
  context_v1.SECURITY_CONTEXT_V1);
contexts.set(
  constants.SECURITY_CONTEXT_V2_URL,
 context_v2.SECURITY_CONTEXT_V2);
