const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8000
const jwtDecode = require('jsonwebtoken');
const bodyParser = require('body-parser')
const { URL } = require('url');
const ENDPOINT_URL = 'https://appleid.apple.com';
const request = require('request-promise-native');

const getAuthorizationToken = async (code, options) => {
  if (!options.clientID) throw new Error('clientID is empty');
  if (!options.redirectUri) throw new Error('redirectUri is empty');
  if (!options.clientSecret) throw new Error('clientSecret is empty');

  const url = new URL(ENDPOINT_URL);
  url.pathname = '/auth/token';

  const form = {
    client_id: options.clientID,
    client_secret: options.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: options.redirectUri,
  };

  const body = await request({ url: url.toString(), method: 'POST', form });
  return JSON.parse(body);
};

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/login', (req, res) => res.render('pages/login'))
  .use('/callback', async (req, res) => {
    const { body, query } = req;
    const code = body.code || query.code;
    const idToken = body.id_token || query.id_token;
    const oauthState = body.state || query.state;

    if (idToken) {
      const idTokenData = jwtDecode.decode(idToken);
      console.log(idTokenData);
      res.render('pages/callback', {
        code: 'xxxxxx',
        idtokenInfo: JSON.stringify(idTokenData, null, 4),
        idt: {
          "kid": "AIDOPK1",
          "alg": "RS256"
        },
        state: oauthState});
    } else if (code) {
      const authTokens = await getAuthorizationToken(code, {
        clientID: 'com.paypal.login.client',
        // redirectUri: 'https://login.paypal.com/callback', // Developeent
        redirectUri: 'https://swapl.herokuapp.com/callback', // production
        clientSecret: 'eyJraWQiOiI1QjI1SzU1RjRTIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJMMkRIVExBUDdLIiwiaWF0IjoxNTYwNjU2OTQ2LCJleHAiOjE1NzYyMDg5NDYsImF1ZCI6Imh0dHBzOi8vYXBwbGVpZC5hcHBsZS5jb20iLCJzdWIiOiJjb20ucGF5cGFsLmxvZ2luLmNsaWVudCJ9.zyD0SRHFokYpc0ctS6igjAIx76xJYfXS_IVNYS73GrtaSZ3PtLjBx8WbYZfsN_DsXXPWOCzAKF2J1EsU8VaiVg'
      }).then(tokenResponse => {
        // console.log(tokenResponse);
        const idTokenData = jwtDecode.decode(tokenResponse.id_token);
        res.render('pages/callback', {
          code: code,
          subject: idTokenData.sub,
          idtokenInfo: JSON.stringify(idTokenData, null, 4),
          idt: {
            "kid": "AIDOPK1",
            "alg": "RS256"
          },
          state: oauthState});        
      }).catch(error => {
        // console.log(error);
        res.render('pages/index');
      });
    } else {
      res.render('pages/index');
    }
  }) 
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
