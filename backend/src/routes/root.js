const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Backend is up' });
});

module.exports = router;


