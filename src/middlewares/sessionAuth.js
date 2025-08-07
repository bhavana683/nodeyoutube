const authenticateSession = (req, res, next) => {
  if (!req.session.userEmail) {
    return res.status(401).json({ 
      success: false,
      error: "Session expired. Please log in again" 
    });
  }
  next();
};

module.exports = authenticateSession;