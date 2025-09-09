const API_SECRET = process.env.BACKEND_API_SECRET;

if (!API_SECRET) {
  throw new Error("BACKEND_API_SECRET is not set in the environment variables.");
}

// Middleware to validate API secret from frontend or Convex
const protectWithSecret = (req, res, next) => {
  const providedKey = req.headers['x-api-secret']; // matches frontend
  if (!providedKey) return res.status(401).json({ message: 'No API key provided' });
  if (providedKey !== API_SECRET) return res.status(403).json({ message: 'Invalid API key' });
  next();
};

module.exports = { protectWithSecret };
