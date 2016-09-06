import { Router } from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';


export default function() {
  var api = Router();
  const secret = "whataawesomeday";

  // jwt
  api.get('/protected/resources', expressJwt({secret}), function(req, res) {
    if (!req.user.admin) return res.status(401).json({message: 'You are not admin!'});
    res.json({message:'mow'});
  });

  api.post('/sessions', function(req, res) {
    const email = req.body.email || "anonymous";
    const token = jwt.sign({ email, admin: email === 'admin@36node.com' }, secret);
    res.json({user:email, token, auth:true});
  });


  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({
      version : '1.0'
    });
  });

  return api;
}
