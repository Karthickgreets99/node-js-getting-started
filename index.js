const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8000
const jwtDecode = require('jsonwebtoken');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/callback', (req, res) => {
    const { body } = req;
// console.log(body);
    if (body.code && body.id_token) {
      const idTokenData = jwtDecode.decode(body.id_token);
      console.log(idTokenData);
      res.render('pages/callback', {
        code: body.code,
        idtokenInfo: JSON.stringify(idTokenData, null, 4),
        idt: {
          "kid": "AIDOPK1",
          "alg": "RS256",

          "iss": "https://appleid.apple.com",
          "aud": "jp.yauth.signin.service3",
          "exp": 1560420369,
          "iat": 1560419769,
          "sub": "000321.9a806ce26a0546e1be8ff23525193a34.0220",
          "at_hash": "RIYyLUoU5AXgtcDEsnXGVA"          
        },
        state: body.state});
    } else {
      res.render('pages/index');
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
