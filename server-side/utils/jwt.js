const jwt = require("jsonwebtoken");

/**
 * Generate JWT token
 * @param {String} userId - MongoDB User ID
 * @param {String} expiresIn - Token expiry (default: 7d)
 * @returns {String} JWT token
 */
const generateToken = (userId, expiresIn = "7d") => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verify JWT token
 * @param {String} token - JWT token from request
 * @returns {Object} Decoded payload { id }
 * @throws Error if token is invalid or expired
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
