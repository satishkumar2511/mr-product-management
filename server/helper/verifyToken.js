import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRETKEY

export function VerifyToken(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(403).json({ message: 'Token is missing' })
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    // Token is valid, and you can access the decoded information (e.g., username)
    req.user = decoded
    next()
  })
}
