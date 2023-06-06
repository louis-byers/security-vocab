/* eslint-disable max-len */
const {documentLoaderFactory} = require('@transmute/jsonld-document-loader');
const fs = require('fs');
const path = require('path');

const didKeyEd25519 = require('@transmute/did-key-ed25519');
const didKeyWebCrypto = require('@transmute/did-key-web-crypto');

const documentLoader = documentLoaderFactory.pluginFactory
  .build()
  .addContext({
    'https://www.w3.org/ns/did/v1': require('../__fixtures__/contexts/did-v1.json'),
    'https://www.w3.org/2018/credentials/v2': require('../__fixtures__/contexts/credentials-v2-unstable.json'),
    'https://w3id.org/security/v1': require('../contexts/security-v1.js').SECURITY_CONTEXT_V1,
    'https://w3id.org/security/v2': require('../contexts/security-v2.js').SECURITY_CONTEXT_V2,
    'https://w3id.org/security/v3-unstable': require('../contexts/security-v3-unstable.js').SECURITY_CONTEXT_V3,
    'https://w3id.org/citizenship/v1': require('../__fixtures__/contexts/citizenship-v1.json'),
  })
  .addResolver({
    'did:example:abc': {
      resolve: async () => {
        return require('./controllers/bls12381-g2.json');
      },
    },
    'did:example:def': {
      resolve: async () => {
        return require('./controllers/ed25519.json');
      },
    },
    'did:example:ghi': {
      resolve: async () => {
        return require('./controllers/p384.json');
      },
    },
    'did:key:z6': {
      resolve: async uri => {
        const {didDocument} = await didKeyEd25519.driver.resolve(uri, {
          accept: 'application/did+ld+json',
        });
        return didDocument;
      },
    },
    'did:key:zA': {
      resolve: async uri => {
        const {didDocument} = await didKeyWebCrypto.driver.resolve(uri, {
          accept: 'application/did+json',
        });
        return didDocument;
      },
    },
  })
  .buildDocumentLoader();

module.exports = {documentLoader};
