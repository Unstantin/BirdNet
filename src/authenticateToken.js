import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 

function authenticateToken(req, res, next) {
  //const authHeader = req.headers['authorization'];
  //const token = authHeader && authHeader.split(' ')[1];

  const token = req.cookies.jwt

  if (!token) {
    req.no_token = true
    next()
    return
    //return res.status(401).json({ message: 'Токен отсутствует' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Неверный токен' });
    }

    req.user = user;
    next();
  });
}

export default authenticateToken;