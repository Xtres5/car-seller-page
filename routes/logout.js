const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  req.session.user = null;
  req.logout((err) => {
    if (err) {
      // Handle any error that may occur during logout
      console.error(err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    
    // Redirect to a page or send a response indicating successful logout
    res.redirect('/'); // You can change the redirect path as needed
  });
});

module.exports = router;