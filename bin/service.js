import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import proxy from 'express-http-proxy';


const app = express();
const secret = "whataawesomeday";

app.set('port', config.service.port);
app.use(bodyParser.json());

// this is fake api, you could delete it if real one is ready
app.post('/sessions', function(req, res) {
  console.log('comming into /sessions')
  const email = req.body.email || "anonymous";
  const token = jwt.sign({ email, admin: email === 'admin@36node.com' }, secret);
  return res.json({user:email, token, auth:true});
});

// this is fake api, you could delete it if real one is ready
app.get('/protected/resources', expressJwt({secret}), function(req, res) {
  if (!req.user.admin) return res.status(401).json({message: 'You are not admin!'});
  return res.json({message:'mow'});
});

// proxy to api service
app.all('*', proxy(config.service.api_gateway));


export default app;