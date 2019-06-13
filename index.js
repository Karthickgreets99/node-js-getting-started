const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8000
const jwtDecode = require('jsonwebtoken');
const bodyParser = require('body-parser')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/callback', (req, res) => {
    const { body } = req;
    if (body && body.code && body.id_token) {
      const idTokenData = jwtDecode.decode(body.id_token);
      console.log(idTokenData);
      res.render('pages/callback', {
        code: body.code,
        idtokenInfo: JSON.stringify(idTokenData, null, 4),
        idt: {
          "kid": "AIDOPK1",
          "alg": "RS256"
        },
        state: body.state});
    } else {
      res.render('pages/index');
    }
  }) 
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
