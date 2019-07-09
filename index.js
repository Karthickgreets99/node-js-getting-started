const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8001
const jwtDecode = require('jsonwebtoken');
const bodyParser = require('body-parser')
const appleSignin = require("apple-signin");

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/frame', (req, res) => res.render('pages/frame'))
  .get('/invoke-apple', (req, res) => res.render('pages/invoke-apple'))
  .get('/login', (req, res) => res.render('pages/login'))
  .get('/pp', (req, res) => res.render('pages/pp-login'))
  .get('/pp2', (req, res) => res.render('pages/pp-login-async'))
  .get('/2', (req, res) => res.render('pages/optin'))
  .get('/airbnb/login', (req, res) => res.render('pages/airbnb_login'))
  .get('/airbnb/account', (req, res) => res.render('pages/Account_Airbnb'))
  .use('/callback', async (req, res) => {
    const { body, query } = req;
    const code = body.code || query.code;
    const idToken = body.id_token || query.id_token;
    const oauthState = body.state || query.state;

    // if (idToken) {
    //   const idTokenData = jwtDecode.decode(idToken);
    //   console.log(idTokenData);
    //   res.render('pages/callback', {
    //     code: 'xxxxxx',
    //     idtokenInfo: JSON.stringify(idTokenData, null, 4),
    //     idt: {
    //       "kid": "AIDOPK1",
    //       "alg": "RS256"
    //     },
    //     state: oauthState});
    // } else 
    if (code) {
      const authTokens = await appleSignin.getAuthorizationToken(code, {
        clientID: 'com.paypal.login.client',
        // redirectUri: 'https://login.paypal.com/callback', // Dev
        redirectUri: 'https://swapl.herokuapp.com/callback', // Prod
        clientSecret: 'eyJraWQiOiI1QjI1SzU1RjRTIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJMMkRIVExBUDdLIiwiaWF0IjoxNTYwNjU2OTQ2LCJleHAiOjE1NzYyMDg5NDYsImF1ZCI6Imh0dHBzOi8vYXBwbGVpZC5hcHBsZS5jb20iLCJzdWIiOiJjb20ucGF5cGFsLmxvZ2luLmNsaWVudCJ9.zyD0SRHFokYpc0ctS6igjAIx76xJYfXS_IVNYS73GrtaSZ3PtLjBx8WbYZfsN_DsXXPWOCzAKF2J1EsU8VaiVg'
      }).then(async (tokenResponse) => {
        // console.log(tokenResponse);
        // const idTokenData = jwtDecode.decode(tokenResponse.id_token);
        const idTokenData = await appleSignin.verifyIdToken(tokenResponse.id_token, 'com.paypal.login.client');
        
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
